import { useEffect, useRef, useState } from "react";
import { isAxiosError } from "axios";
import api from "@/api/axios";
import type { ApiErrorResponse } from "@/api/axios";
import type { EmotionCardDataType } from "./types";
import { emotionColorMap } from "./utils";

export function useDiaryCard(
  id: string,
  date: string,
  onDelete: (diaryId: string) => void,
) {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [emotionCardData, setEmotionCardData] =
    useState<EmotionCardDataType | null>(null);
  const [loadingCard, setLoadingCard] = useState(false);
  const [emotion, setEmotion] = useState("");
  const [loadingEmotion, setLoadingEmotion] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [emotionCardExists, setEmotionCardExists] = useState<boolean | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEmotionInfo = async () => {
      try {
        setLoadingEmotion(true);
        const res = await api.get("/emotion-cards/card-image", {
          params: { diaryId: id },
        });
        if (res.data.success && res.data.result) {
          setEmotion(res.data.result.emotion);
          setEmotionCardExists(true);
        } else
          throw new Error(
            res.data.message || "감정 정보를 불러올 수 없습니다.",
          );
      } catch (err: unknown) {
        const response = isAxiosError<ApiErrorResponse>(err)
          ? err.response
          : undefined;
        console.error("감정 정보 조회 실패:", err);
        if (
          response?.data?.code === "EMOTIONCARD4001" ||
          response?.status === 404
        ) {
          setEmotionCardExists(false);
          setEmotion("");
        } else {
          setEmotionCardExists(null);
          setEmotion("");
        }
      } finally {
        setLoadingEmotion(false);
      }
    };
    fetchEmotionInfo();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        setShowMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchEmotionCard = async () => {
    try {
      setLoadingCard(true);
      const res = await api.get("/emotion-cards/card-image", {
        params: { diaryId: id },
      });
      if (res.data.success && res.data.result) {
        const {
          cardImageUrl,
          emotion: cardEmotion,
          emotions,
          emotionCardId,
          hashtags: cardHashtags,
        } = res.data.result;
        const processedHashtags =
          cardHashtags && cardHashtags.length > 0
            ? cardHashtags.map((tag: { tagName: string }) => tag.tagName)
            : cardHashtags;
        setEmotion(cardEmotion);
        setEmotionCardExists(true);
        setEmotionCardData({
          color: emotionColorMap[cardEmotion] || emotionColorMap.default,
          emotion: cardEmotion,
          image: cardImageUrl,
          date,
          hashtags: processedHashtags,
          emotions,
          emotionCardId,
        });
        setShowModal(true);
      } else
        throw new Error(res.data.message || "감정카드 조회에 실패했습니다.");
    } catch (err: unknown) {
      const response = isAxiosError<ApiErrorResponse>(err)
        ? err.response
        : undefined;
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "object" &&
              err !== null &&
              "message" in err &&
              typeof err.message === "string"
            ? err.message
            : undefined;
      console.error("감정카드 조회 실패", err);
      if (
        response?.data?.code === "EMOTIONCARD4001" ||
        response?.status === 404
      ) {
        setEmotionCardExists(false);
        alert(
          "아직 감정카드가 생성되지 않았습니다. 잠시 후 다시 시도해주세요.",
        );
      } else if (response?.status === 401) alert("로그인이 필요합니다.");
      else
        alert(
          response?.data?.message ||
            message ||
            "감정카드를 불러오는데 실패했습니다.",
        );
    } finally {
      setLoadingCard(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 일기를 삭제하시겠습니까?")) return;
    setShowMenu(false);
    try {
      const response = await api.delete(`/diary/${id}`);
      if (response.data.success) {
        alert("일기가 성공적으로 삭제되었습니다.");
        await onDelete(id);
      } else
        throw new Error(response.data.message || "일기 삭제에 실패했습니다.");
    } catch (err: unknown) {
      const response = isAxiosError<ApiErrorResponse>(err)
        ? err.response
        : undefined;
      console.error("일기 삭제 실패:", err);
      if (response?.status === 401) alert("로그인이 필요합니다.");
      else if (response?.status === 404)
        alert("삭제하려는 일기를 찾을 수 없습니다.");
      else if (response?.status === 500) {
        if (response.data?.code === "COMMON500") {
          alert(
            "서버에서 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          );
          console.error("서버 오류 상세:", response.data.result);
        } else alert("서버 오류가 발생했습니다. 관리자에게 문의해주세요.");
      } else alert(response?.data?.message || "일기 삭제에 실패했습니다.");
    }
  };

  const color = loadingEmotion
    ? "#CCCCCC"
    : emotionCardExists === false
      ? "#E5E7EB"
      : emotion
        ? emotionColorMap[emotion] || emotionColorMap.default
        : "#CCCCCC";
  const buttonText = loadingCard
    ? "로딩 중..."
    : loadingEmotion
      ? "분석 중..."
      : emotionCardExists === false
        ? "감정 분석 중"
        : "감정카드 보기";
  return {
    showModal,
    setShowModal,
    showMenu,
    setShowMenu,
    isExpanded,
    setIsExpanded,
    emotionCardData,
    loadingCard,
    emotion,
    loadingEmotion,
    imageError,
    setImageError,
    imageLoaded,
    setImageLoaded,
    emotionCardExists,
    menuRef,
    fetchEmotionCard,
    handleDelete,
    color,
    buttonText,
    isEmotionButtonDisabled:
      loadingCard || loadingEmotion || emotionCardExists === false,
  };
}
