// services/userService.ts
import api from "@/api/axios" // ✅ 커스텀 axios 인스턴스를 불러오기

export async function getMyUserId(): Promise<string> {
  const res = await api.get("/users/profile"); // ✅ baseURL 자동 적용됨

  console.log("✅ 받은 유저 정보:", res.data); // 👉 전체 응답 로그
  console.log("🎯 userId:", res.data.result.userId); // 👉 userId만 로그

  return res.data.result.userId;
}
