export type SidebarItem = {
  key: 'home' | 'write' | 'profile' | 'friends' | 'calendar' | 'alerts' | 'settings' | 'statistics';
  label: string;
  icon: 'home' | 'write' | 'profile' | 'friends' | 'calendar' | 'alerts' | 'settings' | 'statistics';
  href: string;
  active?: boolean;
};

export const sidebarItems: SidebarItem[] = [
  { key: 'home', label: '홈', icon: 'home', href: '/', active: true },
  { key: 'write', label: '일기 작성', icon: 'write', href: '/diary/write' },
  { key: 'profile', label: '프로필', icon: 'profile', href: '/profile' },
  { key: 'friends', label: '피드', icon: 'friends', href: '/friends/feed' },
  { key: 'calendar', label: '캘린더', icon: 'calendar', href: '/calendar' },
  { key: 'statistics', label: '통계', icon: 'statistics', href: '/statistics' },
  { key: 'alerts', label: '알림', icon: 'alerts', href: '/alarm' },
  { key: 'settings', label: '설정', icon: 'settings', href: '/setting' },
];
