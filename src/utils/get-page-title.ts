export function getPageTitle(currentRoute: string) {
  if (currentRoute.includes('banners')) {
    return 'Banners'
  }

  if (currentRoute.includes('noticias')) {
    return 'Notícias'
  }

  if (currentRoute.includes('eventos')) {
    return 'Eventos'
  }

  if (currentRoute.includes('configuracoes')) {
    return 'Configurações'
  }

  if (currentRoute.includes('convenios')) {
    return 'Convênios'
  }

  if (currentRoute.includes('feed')) {
    return 'Feed'
  }

  if (currentRoute.includes('perfil')) {
    return 'Perfil'
  }

  if (currentRoute.includes('enquetes')) {
    return 'Enquetes'
  }

  if (currentRoute.includes('comentarios')) {
    return 'Comentários'
  }

  if (currentRoute.includes('usuarios')) {
    return 'Usuários'
  }

  if (currentRoute.includes('membros-vdg')) {
    return 'Membros VDG'
  }

  if (currentRoute.includes('relatorios')) {
    return 'Relatórios'
  }

  if (currentRoute.includes('wallet')) {
    return 'Wallet'
  }

  if (currentRoute.includes('channels')) {
    return 'Canais'
  }

  return 'Dashboard'
}
