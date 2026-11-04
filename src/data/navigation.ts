import type { IconName } from '../components/app/Icon'

export interface NavItem {
  id: 'dashboard' | 'explore' | 'mine' | 'create' | 'profile'
  to: string
  label: string
  shortLabel: string
  icon: IconName
  isActive: (pathname: string) => boolean
}

export const navItems: NavItem[] = [
  {
    id: 'dashboard',
    to: '/app',
    label: 'Dashboard',
    shortLabel: 'Home',
    icon: 'home',
    isActive: (p) => p === '/app' || p === '/app/',
  },
  {
    id: 'explore',
    to: '/app/explore',
    label: 'Explore',
    shortLabel: 'Explore',
    icon: 'compass',
    isActive: (p) => p.startsWith('/app/explore'),
  },
  {
    id: 'mine',
    to: '/app/challenges',
    label: 'My Challenges',
    shortLabel: 'Mine',
    icon: 'flag',
    isActive: (p) => p.startsWith('/app/challenges') && p !== '/app/challenges/create',
  },
  {
    id: 'create',
    to: '/app/challenges/create',
    label: 'Create Challenge',
    shortLabel: 'Create',
    icon: 'plus',
    isActive: (p) => p === '/app/challenges/create',
  },
  {
    id: 'profile',
    to: '/app/profile',
    label: 'Profile',
    shortLabel: 'Profile',
    icon: 'user',
    isActive: (p) => p.startsWith('/app/profile'),
  },
]
