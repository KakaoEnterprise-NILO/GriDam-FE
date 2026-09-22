import NotificationList from "@/components/notification/NotificationCardList"
import RecentNotificationList from "@/components/notification/RecentNotificationList"
import MainLayout from "@/components/common/MainLayout"

export default function NotificationPage() {

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br  via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">알림</h1>
            <p className="text-gray-600">새로운 소식과 최근 활동을 확인하세요</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <NotificationList />
              <RecentNotificationList />
            </div>

          </div>
        </div>
      </div>
    </MainLayout>

  )
}
