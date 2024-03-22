'use client'

import { Input } from '@/components/FormComponents'

import { usersServices } from './services'
import { useQuery } from '@tanstack/react-query'
import { WalletPresenters } from './presenters'
import { UserCard } from './user-card'
import { useState } from 'react'
import { Button } from '@/components/UI/Button'
import { Trash2 } from 'lucide-react'

export function Users() {
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const response = await usersServices.index()
      return response.map(WalletPresenters.fromUser)
    },
    queryKey: ['users-wallet'],
  })

  if (!data || isLoading) return <p>Carregando...</p>

  if (error)
    throw new Error('Erro ao buscar usuários, tente novamente mais tarde')

  return (
    <div className="w-full space-y-4">
      <div className="mt-8 flex w-full max-w-[500px] items-end gap-2">
        <Input
          type="text"
          label=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filtre pelo nome do usuário"
        />

        <Button variant="outline" onClick={() => setSearch('')}>
          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
          <span className="sr-only">Limpar filtros</span>
        </Button>
      </div>

      <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
        {data &&
          data
            .filter(
              (item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()),
            )
            .map((item) => {
              return <UserCard {...item} key={item.id} />
            })}
      </div>
    </div>
  )
}
