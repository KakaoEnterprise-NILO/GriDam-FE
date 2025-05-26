import { useState } from "react";
import { Users2 } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";

interface UserProfileCardProps {
  username: string;
  bio: string;
  followers: number;
  following: number;
  isMyProfile?: boolean;
}

export default function UserProfileCard({
  username,
  bio,
  followers,
  following,
  isMyProfile = false,
}: UserProfileCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <div className="w-72 mx-auto p-6 bg-[#F5F7FA] rounded-xl shadow-none flex flex-col items-center space-y-4">
      {/* 프로필 아이콘 */}
      <FaUserCircle size={180} className="text-gray-500" />

      {/* 유저 이름 */}
      <h2 className="text-xl font-semibold text-gray-800">{username}</h2>

      {/* 버튼 */}
      {isMyProfile ? (
        <button
          className="w-[12rem] text-base font-bold text-black bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition py-2"
        >
          프로필 수정
        </button>
      ) : (
        <button
          onClick={handleFollowToggle}
          className={`w-[12rem] py-2 rounded-xl text-sm font-bold transition
            ${
              isFollowing
                ? "bg-gray-100 text-black border border-gray-300"
                : "bg-[#6E8DFB] text-white"
            }
          `}
        >
          {isFollowing ? "팔로우 취소" : "팔로우"}
        </button>
      )}

      {/* 소개 */}
      <p className="text-gray-600 text-sm text-left w-full">{bio}</p>

      {/* 팔로워/팔로잉 */}
      <div className="flex items-center space-x-2 text-sm text-gray-700">
        <Users2 className="w-4 h-4" />
        <span>{followers} followers</span>
        <span>·</span>
        <span>{following} following</span>
      </div>
    </div>
  );
}
