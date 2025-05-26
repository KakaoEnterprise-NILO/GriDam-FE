export type SidebarItem = {
    label: string
    icon: 'home' | 'write' | 'profile' | 'friends' | 'calendar' | 'alerts'
    href: string
    active?: boolean
  }
  
export const sidebarItems = [
  { key: 'home', label: '홈', icon: 'home', href:'/', active:true},
  { key: 'write', label: '일기 작성', icon: 'write', href:'/diary/write' },
  { key: 'profile', label: '프로필', icon: 'profile', href:'/profile' },
  { key: 'friends', label: '피드', icon: 'friends', href:'/friends/feed' }, //ex) href='/(Route path)'로 연결 
  { key: 'calendar', label: '캘린더', icon: 'calendar',href:'/calendar' },
  { key: 'alerts', label: '알림', icon: 'alerts',href:'/alert' },
];

  