export function getContentTitle(currentRoute: string) {
  if (currentRoute.includes('banner')) {
    return 'banner'
  }

  if (currentRoute.includes('noticia')) {
    return 'notícia'
  }

  if (currentRoute.includes('evento')) {
    return 'evento'
  }

  if (currentRoute.includes('configuracoes')) {
    return 'configurações'
  }

  if (currentRoute.includes('convenio')) {
    return 'convênio'
  }

  if (currentRoute.includes('feed')) {
    return 'feed'
  }

  if (currentRoute.includes('perfil')) {
    return 'perfil'
  }

  return 'Dashboard'
}
