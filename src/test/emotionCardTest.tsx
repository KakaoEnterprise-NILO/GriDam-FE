import { useEffect, useState } from 'react';
import api from '@/api/axios';

interface EmotionCard {
  emotionCardId: number;
  emotion: string;
  createdAt: string;
  cardImageUrl?: string;
}

export default function EmotionCardTest() {
  const [cards, setCards] = useState<EmotionCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmotionCards = async () => {
      try {
        const res = await api.get('/emotion-cards', {
          params: { size: 100 },
        });

        const rawCards = res.data.result.cardInfoList;

        setCards(rawCards);
      } catch (err: any) {
        console.error('❌ 감성카드 로딩 실패:', err);
        setError('감성카드 로딩에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmotionCards();
  }, []);

  if (loading) return <div className="p-4">불러오는 중...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📋 감성카드 목록 (최적화 버전)</h1>
      {cards.length === 0 ? (
        <p className="text-gray-500">감성카드가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {cards.map((card) => (
            <li key={card.emotionCardId} className="border p-4 rounded-md shadow">
              <p><strong>감정:</strong> {card.emotion}</p>
              <p><strong>날짜:</strong> {card.createdAt}</p>
              {card.cardImageUrl ? (
                <img
                  src={card.cardImageUrl}
                  alt="감성카드 이미지"
                  className="w-32 h-32 mt-2 rounded object-cover"
                />
              ) : (
                <p className="text-gray-400">이미지를 불러올 수 없습니다.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
