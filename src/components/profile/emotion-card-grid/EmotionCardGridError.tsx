import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
export function EmotionCardGridError({
  error,
  loading,
  onRetry
}: {
  error: string
  loading: boolean
  onRetry: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Alert className="max-w-md">
        <AlertDescription className="text-center">{error}</AlertDescription>
      </Alert>
      <Button
        variant="outline"
        onClick={onRetry}
        className="mt-4"
        disabled={loading}
      >
        <RefreshCw
          className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
        />
        다시 시도
      </Button>
    </div>
  )
}
