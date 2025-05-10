export type SidebarItem = {
    label: string
    icon: 'home' | 'write' | 'profile' | 'friends' | 'calendar' | 'alerts'
    active?: boolean
  }
  
  export const sidebarItems: SidebarItem[] = [
    { label: '홈', icon: 'home', active: true },
    { label: '일기 작성', icon: 'write' },
    { label: '프로필', icon: 'profile' },
    { label: '친구 목록', icon: 'friends' },
    { label: '캘린더', icon: 'calendar' },
    { label: '알림', icon: 'alerts' },
  ]
  