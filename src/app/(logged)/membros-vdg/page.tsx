'use client'

import { Button } from '@/components/FormComponents'
import { faker } from '@faker-js/faker'
import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

// Mock Data
const mockMembers = [
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'VIP MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'VIP MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'VIP MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'VIP MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'VIP MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'VIP MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'VIP MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'VIP MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'MEMBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
  {
    id: faker.number.hex(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    youtubeEmail: faker.internet.email(),
    memberSince: faker.date.past(),
    memberRole: 'SUBSCRIBER',
    imageUrl: faker.image.avatar(),
    isActive: true,
  },
]

type MemberType = 'SUBSCRIBER' | 'MEMBER' | 'VIP MEMBER'

export default function VDGMembers() {
  const [activeMemberTab, setActiveMemberTab] =
    useState<MemberType>('VIP MEMBER')

  const [isConnected, setIsConnected] = useState(false)

  const { data: session, status } = useSession()

  const vipMembers = mockMembers.filter(
    (member) => member.memberRole === 'VIP MEMBER',
  )

  const members = mockMembers.filter((member) => member.memberRole === 'MEMBER')

  const subscribers = mockMembers.filter(
    (member) => member.memberRole === 'SUBSCRIBER',
  )

  async function handleSignIn() {
    const variable = await signIn()
  }

  useEffect(() => {
    if (status === 'loading' || status === 'unauthenticated') {
      setIsConnected(false)
    } else {
      const storedRefreshToken = localStorage.getItem('@VDG:REFRESH_TOKEN')

      if (!storedRefreshToken) {
        setIsConnected(false)
      } else {
        const refreshToken = JSON.parse(storedRefreshToken)
        const isTokenValid = refreshToken.expiresAt > Date.now()

        if (!isTokenValid) {
          localStorage.removeItem('@VDG:REFRESH_TOKEN')
          setIsConnected(false)
        } else {
          try {
            // TODO: função para pegar o refresh token

            localStorage.setItem(
              '@VDG:REFRESH_TOKEN',
              JSON.stringify({
                // @ts-ignore
                refreshToken: session.accessToken,
                expiresAt: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
              }),
            )
          } catch (error) {}
          setIsConnected(true)
        }
      }
    }
  }, [status])

  return (
    <section className="mt-8 flex w-full max-w-[1200px] flex-col items-start gap-8 px-4 pb-24">
      {!isConnected ? (
        <>
          <nav className="grid w-full grid-cols-3">
            <button
              disabled={activeMemberTab === 'VIP MEMBER'}
              data-active={activeMemberTab === 'VIP MEMBER'}
              onClick={() => setActiveMemberTab('VIP MEMBER')}
              className="flex w-full items-center justify-center rounded-lg border border-zinc-300 py-4 font-semibold text-zinc-700 transition-colors data-[active=true]:bg-red-600 data-[active=true]:text-white hover:bg-zinc-50 data-[active=true]:hover:bg-red-600 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 data-[active=true]:dark:hover:bg-red-600"
            >
              MEMBROS VIP
            </button>

            <button
              disabled={activeMemberTab === 'MEMBER'}
              data-active={activeMemberTab === 'MEMBER'}
              onClick={() => setActiveMemberTab('MEMBER')}
              className="flex w-full items-center justify-center rounded-lg border border-zinc-300 py-4 font-semibold text-zinc-700 transition-colors data-[active=true]:bg-red-600 data-[active=true]:text-white hover:bg-zinc-50 data-[active=true]:hover:bg-red-600 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 data-[active=true]:dark:hover:bg-red-600"
            >
              MEMBROS
            </button>

            <button
              disabled={activeMemberTab === 'SUBSCRIBER'}
              data-active={activeMemberTab === 'SUBSCRIBER'}
              onClick={() => setActiveMemberTab('SUBSCRIBER')}
              className="flex w-full items-center justify-center rounded-lg border border-zinc-300 py-4 font-semibold text-zinc-700 transition-colors data-[active=true]:bg-red-600 data-[active=true]:text-white hover:bg-zinc-50 data-[active=true]:hover:bg-red-600 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 data-[active=true]:dark:hover:bg-red-600"
            >
              INSCRITOS
            </button>
          </nav>

          <div className="grid w-full grid-cols-1 gap-2">
            {activeMemberTab === 'VIP MEMBER' &&
              vipMembers.map((member) => (
                <MemberItem key={member.id} {...member} />
              ))}

            {activeMemberTab === 'MEMBER' &&
              members.map((member) => (
                <MemberItem key={member.id} {...member} />
              ))}

            {activeMemberTab === 'SUBSCRIBER' &&
              subscribers.map((member) => (
                <MemberItem key={member.id} {...member} />
              ))}
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <span>
            Para verificar os membros, você precisa primeiro conectar com a
            conta do Youtube
          </span>

          <Button variant="outline" className="mx-auto" onClick={handleSignIn}>
            Conectar
          </Button>
        </div>
      )}
    </section>
  )
}

function MemberItem(member: (typeof mockMembers)[0]) {
  return (
    <div
      key={member.id}
      className="flex w-full items-center justify-start rounded-lg border border-zinc-300 px-4 py-2 dark:border-zinc-600"
    >
      <div className="flex items-center justify-start gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.imageUrl}
          alt={member.name}
          className="h-8 w-8 rounded-full"
        />

        <div className="flex flex-col items-start justify-center">
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {member.name}
          </span>

          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {member.memberRole}
          </span>
        </div>
      </div>
    </div>
  )
}
