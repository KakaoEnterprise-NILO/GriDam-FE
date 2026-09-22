import { useState } from 'react'
import { X } from 'lucide-react'
import { PieChart, Pie, Cell } from 'recharts'

type EmotionCardProps = {
  front: {
    color: string
    emotion: string
    image: string
  }
  back: {
    color: string
    date: string
    hashtags: string[]
    chartData: { name: string; value: number }[]
  }
  onClose?: () => void
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function EmotionCard({ front, back, onClose }: EmotionCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="w-full max-w-[320px] mx-auto relative cursor-pointer"
      style={{ perspective: 1500 }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-[480px] transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          className={`absolute w-full h-full rounded-xl border shadow-xl px-6 py-8 flex flex-col justify-between ${front.color}`}
          style={{
            backgroundColor: front.color,
            backfaceVisibility: 'hidden',
          }}
        >

          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-[0.3em] text-[#5b3d1d]">
              {front.emotion.toUpperCase()}
            </h2>
          </div>

          <div className="relative w-full h-[280px]">
            <img
              src={front.image}
              alt="emotion"
              className="w-full h-full object-cover rounded-md border shadow-md"
            />
          </div>

          <div className="text-center">
            <p className="text-2xl italic text-[#5b3d1d] font-serif">{front.emotion}</p>
          </div>
        </div>

        <div
          className={`absolute w-full h-full rounded-xl border shadow-xl px-6 py-8 flex flex-col justify-between`}
          style={{
            backgroundColor: back.color,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            top: 0,
            left: 0,
            position: 'absolute',
          }}
        >
          {onClose && (
            <button type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
            >
              <X size={24} />
            </button>
          )}
          <div className="text-center text-lg text-gray-700 font-semibold">{back.date}</div>

          <div className="flex justify-center">
            <div className="w-full h-[280px]">
              <PieChart width={280} height={280}>
                <Pie
                  data={back.chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {back.chartData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-md text-gray-600 font-medium"># {back.hashtags.join(' # ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
