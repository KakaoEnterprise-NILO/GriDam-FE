import type { TooltipProps } from "recharts"

export default function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{data.name}</p>
        <p className="text-sm text-gray-600">{data.value}%</p>
      </div>
    )
  }
  return null
}
