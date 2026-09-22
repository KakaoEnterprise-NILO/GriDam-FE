import MainLayout from "../common/MainLayout";
interface Props {
  error: string;
  onRetry: () => void;
}
export default function CalendarErrorState({ error, onRetry }: Props) {
  return (
    <MainLayout>
      <div className="w-full bg-white rounded-3xl shadow-lg max-w-4xl mx-auto px-6 md:px-10 py-8">
        <div className="text-center py-12">
          <div className="text-red-400 text-5xl mb-6">🚨</div>
          <h3 className="text-red-600 mb-4 font-semibold text-lg">서버 오류</h3>
          <p className="text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
            {error}
          </p>
          <div className="flex gap-3 justify-center">
            <button type="button"
              onClick={onRetry}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors font-medium"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
