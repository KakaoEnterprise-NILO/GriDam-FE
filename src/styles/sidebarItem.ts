export type SidebarItem = {
    label: string
    icon: 'home' | 'write' | 'profile' | 'friends' | 'calendar' | 'alerts'
    active?: boolean
  }
  
export const sidebarItems = [
  { key: 'home', label: '홈', icon: 'home' },
  { key: 'write', label: '일기 작성', icon: 'write' },
  { key: 'profile', label: '프로필', icon: 'profile' },
  { key: 'friends', label: '친구 목록', icon: 'friends' },
  { key: 'calendar', label: '캘린더', icon: 'calendar' },
  { key: 'alerts', label: '알림', icon: 'alerts' },
];

  