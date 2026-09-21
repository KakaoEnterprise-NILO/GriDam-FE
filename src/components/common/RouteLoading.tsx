export default function RouteLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-1 items-center justify-center bg-[#F7F8FC] p-6"
    >
      <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-5 shadow-sm">
        <span
          aria-hidden="true"
          className="h-5 w-5 animate-spin rounded-full border-2 border-blue-100 border-t-blue-500 motion-reduce:animate-none"
        />
        <p className="text-sm text-gray-600">페이지를 불러오는 중...</p>
      </div>
    </div>
  );
}
