export interface IGoalScorer {
  time: string
  home_scorer: string
  home_scorer_id: string
  home_assist: string
  home_assist_id: string
  score: string
  away_scorer: string
  away_scorer_id: string
  away_assist_id: string
  info: string
  scorer_info_time: string
}

export interface ICard {
  time: string
  home_fault: string
  card: string
  away_fault: string
}

export interface ISubstitution {
  time: string
  home_out: string
  home_in: string
  away_out: string
  away_in: string
}

export interface IPlayer {
  lineup_player: string
  lineup_number: string
  lineup_position: string
  lineup_firstname: string
  lineup_lastname: string
  lineup_age: string
}

export interface ILineupTeam {
  starting_lineups: Array<IPlayer>
  substitutes: Array<IPlayer>
  coach: Array<IPlayer>
}

export interface ILineup {
  home: ILineupTeam
  away: ILineupTeam
}

export interface IMatch {
  match_id: string
  country_id: string
  country_name: string
  league_id: string
  league_name: string
  match_date: string
  match_status: string
  match_time: string
  match_hometeam_id: string
  match_hometeam_name: string
  match_hometeam_score: string
  match_awayteam_name: string
  match_awayteam_id: string
  match_awayteam_score: string
  match_hometeam_halftime_score: string
  match_awayteam_halftime_score: string
  match_hometeam_extra_score: string
  match_awayteam_extra_score: string
  match_hometeam_penalty_score: string
  match_awayteam_penalty_score: string
  match_hometeam_system: string
  match_awayteam_system: string
  match_live: string
  goalscorer: Array<IGoalScorer>
  cards: Array<ICard>
  substitutions: Array<ISubstitution>
  lineups: Array<ILineup>
  // statistics: Array<IStatistic>
  match_date_utc: string
  match_timezone: string
  match_time_utc: string
}
