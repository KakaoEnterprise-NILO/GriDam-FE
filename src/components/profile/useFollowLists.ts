import { useCallback, useEffect, useRef, useState } from "react"
import { isAxiosError } from "axios"
import type { ApiErrorResponse } from "@/api/axios"
import {
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser
} from "@/services/followService"
import type { FollowListResponse, FollowUser } from "@/services/followService"

export interface FollowListProps {
  onUserSelect?: (userId: string) => void
  targetUserId?: string
  isMyProfile?: boolean
}

interface FollowListOptions {
  loadUsers: () => Promise<FollowListResponse>
  privateMessage: string
  failureMessage: string
}

const followerOptions: FollowListOptions = {
  loadUsers: getFollowers,
  privateMessage: "다른 사용자의 팔로워 목록은 비공개입니다.",
  failureMessage: "팔로워 목록을 불러오지 못했습니다."
}

const followingOptions: FollowListOptions = {
  loadUsers: getFollowing,
  privateMessage: "다른 사용자의 팔로잉 목록은 비공개입니다.",
  failureMessage: "팔로우 목록을 불러오지 못했습니다."
}

function getErrorMessage(error: unknown, fallback: string) {
  const response = isAxiosError<ApiErrorResponse>(error)
    ? error.response
    : undefined
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof error.message === "string"
        ? error.message
        : undefined
  return response?.data?.message || message || fallback
}

function useFollowList(
  { loadUsers, privateMessage, failureMessage }: FollowListOptions,
  isMyProfile: boolean,
  targetUserId?: string
) {
  const [users, setUsers] = useState<FollowUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const requestGeneration = useRef(0)

  const fetchUsers = useCallback(async () => {
    const generation = requestGeneration.current
    try {
      setLoading(true)
      setError(null)
      if (!isMyProfile) {
        setUsers([])
        setError(privateMessage)
        return
      }

      const response = await loadUsers()
      if (generation !== requestGeneration.current) return

      if (response.success) {
        setUsers(response.result.followList)
      } else {
        setError(response.message || failureMessage)
      }
    } catch (error: unknown) {
      if (generation !== requestGeneration.current) return
      setError(getErrorMessage(error, "알 수 없는 오류가 발생했습니다."))
    } finally {
      if (generation === requestGeneration.current) setLoading(false)
    }
  }, [isMyProfile, loadUsers, privateMessage, failureMessage])

  useEffect(() => {
    fetchUsers()
    return () => {
      requestGeneration.current += 1
    }
  }, [fetchUsers, targetUserId])

  return { users, setUsers, loading, error, fetchUsers }
}

export function useFollowers(isMyProfile: boolean, targetUserId?: string) {
  const { users, loading, error, fetchUsers } = useFollowList(
    followerOptions,
    isMyProfile,
    targetUserId
  )

  const handleFollowBack = async (userId: string) => {
    try {
      const response = await followUser(userId)
      if (!response.success) {
        alert(response.message || "팔로우에 실패했습니다.")
      }
    } catch (error: unknown) {
      alert(getErrorMessage(error, "팔로우 중 오류가 발생했습니다."))
    }
  }

  return { users, loading, error, fetchUsers, handleFollowBack }
}

export function useFollowing(isMyProfile: boolean, targetUserId?: string) {
  const { setUsers, ...list } = useFollowList(
    followingOptions,
    isMyProfile,
    targetUserId
  )

  const handleUnfollow = async (userId: string) => {
    if (!isMyProfile) return

    try {
      const response = await unfollowUser(userId)
      if (response.success) {
        setUsers((previous) =>
          previous.filter((user) => user.userId !== userId)
        )
      } else {
        alert(response.message || "언팔로우에 실패했습니다.")
      }
    } catch (error: unknown) {
      alert(getErrorMessage(error, "언팔로우 중 오류가 발생했습니다."))
    }
  }

  return { ...list, handleUnfollow }
}
