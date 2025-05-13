export type SidebarItem = {
    label: string
    icon: 'home' | 'write' | 'profile' | 'friends' | 'calendar' | 'alerts'
    href: string
    active?: boolean
  }
  
  export const sidebarItems: SidebarItem[] = [
    { label: '홈', icon: 'home', href:'/' },    
    { label: '일기 작성', icon: 'write',href:'/..' },
    { label: '프로필', icon: 'profile',href:'/..' },
    { label: '친구 목록', icon: 'friends',href:'/..' },
    { label: '캘린더', icon: 'calendar',href:'/..' }, //ex) href='/(Route path)'로 연결 
    { label: '알림', icon: 'alerts',href:'/alram' },
  ]
  