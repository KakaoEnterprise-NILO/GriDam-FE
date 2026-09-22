import type { MouseEventHandler, RefObject } from "react"
import { FEED_VISIBILITY_OPTIONS, SHARE_SCOPE_OPTIONS } from "./constants"

interface EmotionCardSharingProps {
  feedVisibility: string
  shareScope: string
  summary: string
  progress: number
  progressBarRef: RefObject<HTMLDivElement | null>
  onFeedVisibilityChange: (value: string) => void
  onShareScopeChange: (value: string) => void
  updateProgress: MouseEventHandler<HTMLDivElement>
}

export default function EmotionCardSharing({
  feedVisibility,
  shareScope,
  summary,
  progress,
  progressBarRef,
  onFeedVisibilityChange,
  onShareScopeChange,
  updateProgress
}: EmotionCardSharingProps) {
  return (
    <>
      <div>
        <p className="text-gray-600 mb-2 text-left">피드 생성 여부</p>
        <div className="flex justify-between space-x-6">
          {FEED_VISIBILITY_OPTIONS.map((option) => (
            <label className="custom-radio" key={option}>
              <input
                type="radio"
                name="feedVisibility"
                value={option}
                checked={feedVisibility === option}
                onChange={() => onFeedVisibilityChange(option)}
              />
              <span className="custom-radio-btn"></span>
              <span className="text-gray-800 font-bold">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-gray-600 mb-2 text-left">공개 범위</p>
        <div className="flex justify-between space-x-6">
          {SHARE_SCOPE_OPTIONS.map((scope) => (
            <label className="custom-radio" key={scope}>
              <input
                type="radio"
                name="shareScope"
                value={scope}
                checked={shareScope === scope}
                onChange={() => onShareScopeChange(scope)}
              />
              <span className="custom-radio-btn"></span>
              <span className="text-gray-800 font-bold">{scope}</span>
            </label>
          ))}
        </div>
      </div>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          shareScope === "요약 공개"
            ? "max-h-40 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-4 space-y-4">
          <p className="text-gray-600 mb-2 text-left">요약본</p>
          <p className="text-gray-700 text-sm mb-4">{summary}</p>
          <div className="mt-2 flex items-center">
            <span className="font-bold text-blue-500">T</span>
            <div
              className="flex-1 mx-2 bg-gray-200 rounded-full h-3 relative cursor-pointer"
              ref={progressBarRef}
              onMouseDown={updateProgress}
              onMouseMove={(e) => e.buttons === 1 && updateProgress(e)}
            >
              <div
                className="h-3 rounded-full absolute left-0 transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(to right, #4f83ff, #4caf50)`
                }}
              />
            </div>
            <span className="font-bold text-gray-700">F</span>
          </div>
        </div>
      </div>
    </>
  )
}
