export type EmotionData = {
  name: string
  value: number
  color: string
  emoji: string
}

export interface CustomTooltipProps {
  totalEntries: number
  active?: boolean
  payload?: { payload?: EmotionData }[]
}

export interface StatisticsPopupProps {
  open: boolean
  onClose: () => void
  data: EmotionData[]
  year: number
  month: number
}


export interface StatisticsHeaderProps {
  year: number
  month: number
  onClose: () => void
}

export interface EmotionDistributionProps {
  data: EmotionData[]
  totalEntries: number
  activeIndex: number | null
  onSelect: (index: number) => void
}

export interface EmotionChartProps {
  data: EmotionData[]
  cellData: EmotionData[]
  totalEntries: number
  activeIndex: number | null
  onActiveChange: (index: number | null) => void
}
