const features = [
  {
    icon: "📝",
    title: "감정을 기록하고 싶은 분",
    description: "그리담은 일기를 쓰고 감정을 분석해 줍니다.",
    color: "from-blue-50 to-indigo-50",
    hoverColor: "hover:from-blue-100 hover:to-indigo-100",
  },
  {
    icon: "😊",
    title: "일기를 공유하고 싶은 분",
    description: "일기를 쓰고 감정카드도 만들어 사람들과 소통할 수 있습니다.",
    color: "from-purple-50 to-pink-50",
    hoverColor: "hover:from-purple-100 hover:to-pink-100",
  },
  {
    icon: "📘",
    title: "감정을 관리하고 싶은 분",
    description: "캘린더를 통해 보기 쉽게 감정 추이를 볼 수 있습니다.",
    color: "from-green-50 to-emerald-50",
    hoverColor: "hover:from-green-100 hover:to-emerald-100",
  },
];
export default function HomeFeatures() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            그리담, 이렇게 활용하세요
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${feature.color} ${feature.hoverColor} p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 cursor-pointer border border-white/50`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
