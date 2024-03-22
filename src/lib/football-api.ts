import axios from 'axios'
import { IMatch } from '@/@types/FootballApi'

interface GetNextMatchesProps {
  initialDate: string
  endDate: string
}

class FootballApiClass {
  public timeZone = 'timezone=America/Sao_Paulo'

  private readonly internacionalId = '559'
  private readonly API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY
  private readonly baseUrl = `https://apiv3.apifootball.com/`
  private readonly footballApi = axios.create({ baseURL: this.baseUrl })

  /**
   * @description Get the next matches of Internacional team
   * You should pass the end date and the start date in the format yyyy-mm-dd
   */
  public async getNextMatches({ endDate, initialDate }: GetNextMatchesProps) {
    const { data } = await this.footballApi.get<Array<IMatch>>('/', {
      params: {
        to: endDate,
        from: initialDate,
        action: 'get_events',
        APIkey: this.API_KEY,
        team_id: this.internacionalId,
      },
    })

    return data
  }
}

export const FootballApi = new FootballApiClass()
