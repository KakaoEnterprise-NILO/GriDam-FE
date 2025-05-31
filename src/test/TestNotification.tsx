import React, { useState } from "react";
import api from "@/api/axios"; // ✅ axios 인스턴스 불러오기
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";

const TestNotification: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateTestNotification = async () => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      // ✅ 인증 포함된 요청
      const response = await api.post("/notifications/notifications/test");

      // ✅ 응답 처리
      setSuccess(response.data.result); // "테스트 알림이 생성되었습니다."
    } catch (err: any) {
      setError(
        err.response?.data?.message || "알림 생성 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto rounded-xl shadow-md bg-white space-y-4">
      <h2 className="text-xl font-bold text-gray-800">테스트 알림 생성</h2>

      <Button onClick={handleCreateTestNotification} disabled={loading}>
        {loading ? "생성 중..." : "테스트 알림 생성하기"}
      </Button>

      {success && (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default TestNotification;
