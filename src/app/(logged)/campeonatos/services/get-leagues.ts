import axios from 'axios'

type LeaguesDTO = {
  country_id: string
  country_name: string
  league_id: string
  league_name: string
  league_season: string
  league_logo: string
  country_logo: string
}

const currentTeamLeaguesId = ['99', '349', '102', '385', '18']

export async function getLeagues(): Promise<LeaguesDTO[]> {
  const brazilID = 27
  const latinoAmericaID = 2

  const cached = localStorage.getItem('leagues')

  if (cached) {
    return JSON.parse(cached)
  }

  const [nationalLeagues, internationalLegues] = await Promise.all([
    axios.get<LeaguesDTO[]>(
      `https://apiv3.apifootball.com/?action=get_leagues&country_id=${brazilID}&APIkey=${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
    ),

    axios.get<LeaguesDTO[]>(
      `https://apiv3.apifootball.com/?action=get_leagues&country_id=${latinoAmericaID}&APIkey=${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
    ),
  ])

  const leagues = [...nationalLeagues.data, ...internationalLegues.data].filter(
    (league) => currentTeamLeaguesId.includes(league.league_id),
  )

  localStorage.setItem('leagues', JSON.stringify(leagues))

  return leagues
}
