import React, { useState } from "react";
import api from "@/api/axios";

interface FollowButtonProps {
  targetId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ targetId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [followed, setFollowed] = useState(false);

  const handleFollow = async () => {
    if (loading || followed) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.post(`/follows/${targetId}`);

      if (res.data.success) {
        setFollowed(true);
      } else {
        setError(res.data.message || "팔로우에 실패했습니다.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleFollow}
        disabled={loading || followed}
        className={`px-3 py-1 rounded text-white ${
          followed ? "bg-gray-400 cursor-default" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {followed ? "팔로우 완료" : loading ? "팔로우 중..." : "팔로우"}
      </button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FollowButton;
