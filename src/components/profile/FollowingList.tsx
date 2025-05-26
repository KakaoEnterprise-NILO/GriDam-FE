import FollowingUserItem from "./FollowingUserItem";
import gridamIcon from "@/assets/picture/gridam.svg"; // ✅ 이미지 import

const followingData = [
  { username: "NILO" },
  { username: "KaKao" },
  { username: "Happy" },
  { username: "NILO" },
  { username: "KaKao" },
  { username: "Happy" },
];

export default function FollowingList() {
  const handleUnfollow = (username: string) => {
    console.log(`Unfollowed ${username}`);
  };

  return (
    <div className="bg-[#F5F7FA] p-6 rounded-xl max-w-3xl mx-auto">
      {followingData.map((user, index) => (
        <FollowingUserItem
          key={index}
          profileImage={gridamIcon} // ✅ 동일 이미지 사용
          username={user.username}
          onUnfollow={() => handleUnfollow(user.username)}
        />
      ))}
    </div>
  );
}
