export const useUsers = () => {
  const policies: Record<string, string> = {
    news: 'Notícias',
    feed: 'Feeds',
    events: 'Eventos',
    surveys: 'Enquetes',
    banners: 'Banners',
    members: 'Membros VDG',
    settings: 'Configurações',
    comments: 'Comentários',
    payments: 'Pagamentos',
    covenants: 'Convênios',
    notifications: 'Notificações',
  }

  return {
    policies,
  }
}
