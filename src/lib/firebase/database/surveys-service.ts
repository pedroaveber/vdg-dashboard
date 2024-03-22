import { FirestoreDatabase } from '.'

interface ConstructorProps {
  collection: string
  bucket: string
}

interface VerifyIfSurveyIsExpired {
  expireDate: Date
  expireHour: string
}

class SurveyClass extends FirestoreDatabase {
  constructor({ bucket, collection }: ConstructorProps) {
    super({ bucket, collection })
  }

  public verifyIfSurveyIsExpired({
    expireDate,
    expireHour,
  }: VerifyIfSurveyIsExpired): boolean {
    const today = new Date()

    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const hour = today.getHours()
    const minute = today.getMinutes()

    const surveyExpireDate = expireDate

    const surveyExpireDay = surveyExpireDate.getDate()
    const surveyExpireMonth = surveyExpireDate.getMonth() + 1
    const surveyExpireYear = surveyExpireDate.getFullYear()

    const surveyExpireTime = expireHour
    const [surveyExpireHour, surveyExpireMinute] = surveyExpireTime.split(':')

    if (year > surveyExpireYear) {
      return true
    }

    if (year === surveyExpireYear && month > surveyExpireMonth) {
      return true
    }

    if (
      year === surveyExpireYear &&
      month === surveyExpireMonth &&
      day > surveyExpireDay
    ) {
      return true
    }

    if (
      year === surveyExpireYear &&
      month === surveyExpireMonth &&
      day === surveyExpireDay &&
      hour > Number(surveyExpireHour)
    ) {
      return true
    }

    if (
      year === surveyExpireYear &&
      month === surveyExpireMonth &&
      day === surveyExpireDay &&
      hour === Number(surveyExpireHour) &&
      minute > Number(surveyExpireMinute)
    ) {
      return true
    }

    return false
  }
}

export const SurveyService = new SurveyClass({
  bucket: 'surveys',
  collection: 'surveys',
})
