import api from "../api/axios"; // axios 인스턴스 import

// type UploadFeedResponse = {
//   result: {
//     // 반환되는 데이터 구조에 따라 구체적으로 작성
//     feedId: number;
//     message: string;
//   };
// };

export async function uploadFeed(
  emotionCardId: number,
  content: string,
  isPublic: boolean
) {
  try {
    // api 인스턴스 사용 (Authorization 헤더는 interceptor에서 자동 처리)
    const response = await api.post(`/feed/upload/${emotionCardId}`, {
      content,
      public: isPublic,
    });

    return response.data.result;
  } catch (error: any) {
    // axios 에러 처리
    if (error.response) {
      // 서버가 응답을 반환한 경우
      throw new Error(`[피드 업로드 실패] ${error.response.status}: ${error.response.data?.message || error.message}`);
    } else if (error.request) {
      // 요청이 전송되었지만 응답이 없는 경우
      throw new Error("[피드 업로드 실패] 서버 응답 없음");
    } else {
      // 요청 설정 중 오류 발생
      throw new Error(`[피드 업로드 실패] ${error.message}`);
    }
  }
}