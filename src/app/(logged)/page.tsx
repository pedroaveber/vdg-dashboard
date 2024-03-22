import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { UserLoggedType } from '@/@types/LocalStorage'

export default function Home() {
  const credentials = cookies().get('VDG_CURRENT_USER')

  if (!credentials) return redirect('/auth')

  const user = JSON.parse(credentials.value) as UserLoggedType
  if (user.role === 'super-admin') {
    redirect('/banners')
  } else {
    redirect('/' + user.policy[0])
  }
}
