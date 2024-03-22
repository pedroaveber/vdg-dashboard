export function getPaginationRoutes(currentRoute: string) {
  if (currentRoute.includes('banners')) {
    return 'banners'
  }

  if (currentRoute.includes('noticias')) {
    return 'noticias'
  }

  if (currentRoute.includes('eventos')) {
    return 'eventos'
  }

  if (currentRoute.includes('configuracoes')) {
    return 'configuracoes'
  }

  if (currentRoute.includes('convenios')) {
    return 'convenios'
  }

  if (currentRoute.includes('feed')) {
    return 'feed'
  }

  if (currentRoute.includes('perfil')) {
    return 'perfil'
  }

  return 'Dashboard'
}
