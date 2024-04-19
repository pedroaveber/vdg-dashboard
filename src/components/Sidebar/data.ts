import type { IconType } from 'react-icons'

import {
  Image,
  Newspaper,
  FileText,
  Tags,
  CalendarDays,
  BellRing,
  ClipboardList,
  LineChart,
  MessageSquareQuote,
  Settings,
  MessagesSquare,
  Users,
  Play,
  Wallet,
  Trophy,
} from 'lucide-react'

import { AiFillIdcard } from 'react-icons/ai'

import type { LucideIcon } from 'lucide-react'

type NavItem = {
  href: string
  name: string
  Icon: LucideIcon | IconType
  value: string
  disabled: boolean
}

export const navItems: Array<NavItem> = [
  {
    href: '/banners',
    name: 'Banners',
    value: 'banners',
    Icon: Image,
    disabled: false,
  },
  {
    href: '/noticias',
    name: 'Notícias',
    value: 'news',
    Icon: Newspaper,
    disabled: false,
  },
  {
    href: '/cronicas',
    name: 'Crônicas',
    value: 'chronicles',
    Icon: FileText,
    disabled: false,
  },
  {
    href: '/feed',
    name: 'Feed',
    value: 'feeds',
    Icon: MessageSquareQuote,
    disabled: false,
  },
  {
    href: '/convenios',
    name: 'Convênios',
    value: 'covenants',
    Icon: Tags,
    disabled: false,
  },
  {
    href: '/eventos',
    name: 'Eventos',
    value: 'events',
    Icon: CalendarDays,
    disabled: false,
  },
  {
    href: '/enquetes',
    name: 'Enquetes',
    value: 'surveys',
    Icon: ClipboardList,
    disabled: false,
  },
  {
    href: '/channels',
    name: 'Canais',
    value: 'channels',
    Icon: Play,
    disabled: false,
  },
  {
    href: '/campeonatos',
    name: 'Campeonatos',
    value: 'leagues',
    Icon: Trophy,
    disabled: false,
  },
  {
    href: '/relatorios',
    name: 'Relatórios',
    Icon: LineChart,
    value: '',
    disabled: false,
  },
  {
    href: '/wallet',
    name: 'Wallet',
    value: 'wallet',
    Icon: Wallet,
    disabled: false,
  },
  {
    href: '/comentarios',
    name: 'Comentários',
    value: 'comments',
    Icon: MessagesSquare,
    disabled: false,
  },
  {
    href: '/usuarios',
    name: 'Usuários',
    value: 'users',
    Icon: Users,
    disabled: false,
  },
  {
    href: '/configuracoes',
    name: 'Configurações',
    value: 'settings',
    Icon: Settings,
    disabled: false,
  },
  {
    href: '/membros-vdg',
    name: 'Membros VDG',
    value: 'members',
    Icon: AiFillIdcard,
    disabled: true,
  },
  {
    href: '/notificacoes',
    name: 'Notificações',
    value: 'notifications',
    Icon: BellRing,
    disabled: true,
  },
]
