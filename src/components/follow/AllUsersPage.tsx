import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import FollowButton from "@/components/follow/FollowButton";

interface UserSummary {
  id: string;
  nickname: string;
  profileImageUrl?: string | null;
}

const AllUsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userInfoRes = await api.get("/users/info");
        const myUserId = userInfoRes.data.result.userId;
        setCurrentUserId(myUserId);

        const allUsersRes = await api.get("/users/all");

        if (allUsersRes.data.success) {
          const filteredUsers = allUsersRes.data.result.filter(
            (user: UserSummary) => user.id !== myUserId
          );
          setUsers(filteredUsers);
        } else {
          setError(allUsersRes.data.message || "사용자 목록을 불러올 수 없습니다.");
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4 text-center">로딩 중...</div>;
  if (error) return <div className="p-4 text-center text-red-500">에러: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">모든 사용자 목록</h1>
      {users.length === 0 ? (
        <p>표시할 사용자가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between space-x-4 p-3 border rounded hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.profileImageUrl || "/default-profile.png"}
                  alt={`${user.nickname} 프로필 이미지`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-medium">{user.nickname}</p>
                  <p className="text-sm text-gray-500">{user.id}</p>
                </div>
              </div>
              <FollowButton targetId={user.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllUsersPage;
