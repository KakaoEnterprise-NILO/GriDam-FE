// services/emotionCardService.ts
import api from "@/api/axios" // ✅ 커스텀 axios 인스턴스를 불러오기

export const getEmotionCardImage = async (diaryId: string) => {
  const res = await api.get("/emotion-cards/card-image", {
    params: { diaryId },
  });

    return res.data.result?.cardImageUrl || null;
  } catch (error: any) {
    console.error("감정 카드 이미지 조회 실패:", error);
    throw error; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있도록 함
  }
};


// ✅ 2. 날짜로 감정 카드 정보 조회 (감정, 해시태그, 이미지 URL)
export interface EmotionCardByDateResponse {
  emotion: string;
  hashtags: string[];
  url: string;
}

export const getEmotionCardByDate = async (
  date: string
): Promise<EmotionCardByDateResponse | null> => {
  try {
    const res = await api.get("/emotion-cards/date", {
      params: { date },
    });
    
    const result = res.data.result;
    
    // 서버 응답 구조가 인터페이스와 다를 경우 매핑 처리
    if (result) {
      // 서버 응답에서 필요한 데이터 추출 및 변환
      return {
        emotion: result.emotion || "",
        // 서버에서 hashtags가 객체 배열로 오는 경우 문자열 배열로 변환
        hashtags: Array.isArray(result.hashtags) 
          ? result.hashtags.map((tag: any) => 
              typeof tag === 'string' ? tag : tag.tagName || tag.name || tag.toString())
          : [],
        url: result.cardImageUrl || result.url || "",
      };
    }
    
    console.log("📅 날짜 기반 감정카드 응답:", result);
    return null;
  } catch (err) {
    console.error("❌ 날짜 기반 감정카드 조회 실패:", err);
    return null;
  }
};