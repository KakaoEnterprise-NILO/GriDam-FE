import { Navigate, Outlet, useLocation } from "react-router-dom"
import RouteLoading from "@/components/common/RouteLoading"
import { useAuthStore } from "@/store/authStore"

export default function ProtectedRoute() {
  const authStatus = useAuthStore((state) => state.authStatus)
  const location = useLocation()

  if (authStatus === "checking") {
    return <RouteLoading />
  }

  if (authStatus === "unauthenticated") {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
          },
        }}
      />
    )
  }

  return <Outlet />
}
