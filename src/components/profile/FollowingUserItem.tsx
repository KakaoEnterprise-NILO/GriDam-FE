interface FollowingUserItemProps {
  profileImage: string;
  username: string;
  onUnfollow: () => void;
}

export default function FollowingUserItem({
  profileImage,
  username,
  onUnfollow,
}: FollowingUserItemProps) {
  return (
    <div className="flex items-center justify-between py-4  border-b border-gray-200">
      {/* 유저 정보 */}
      <div className="flex items-center space-x-4">
        <img
          src={profileImage}
          alt={username}
          className="w-16 h-16 rounded-full object-cover"
        />
        <span className="text-[15px] font-medium text-gray-800">{username}</span>
      </div>

      {/* Unfollow 버튼 */}
      <button
        onClick={onUnfollow}
        className="px-4 py-1 text-sm font-semibold border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition"
      >
        Unfollow
      </button>
    </div>
  );
}
