'use client'

import { Button } from '@/components/FormComponents/Button'
import { UserManagementDialog } from './components/user-management-dialog'
import { UsersPageSkeleton } from './components/users-page-skeleton'
import { usersServices } from './services'
import { useQuery } from '@tanstack/react-query'
import { Accordion } from '@/components/UI/accordion'
import { UserItem } from './components/user-item'

export default function Users() {
  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const response = await usersServices.index()
      return response.filter(
        (item) => item.role !== 'user' && item.policy !== undefined,
      )
    },
    queryKey: ['users-general'],
  })

  if (error) throw new Error('Erro ao buscar usuários')

  return (
    <>
      <div className="mx-auto w-full">
        {!isLoading ? (
          <Accordion type="multiple" className="w-full">
            {data!.map((user) => (
              <UserItem user={user} key={user.id} />
            ))}
          </Accordion>
        ) : (
          <UsersPageSkeleton />
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-2 md:relative md:flex md:w-full md:justify-end md:p-0">
        <UserManagementDialog>
          <Button className="flex h-[50px] w-full items-center justify-center font-bold md:h-auto md:w-auto md:font-normal">
            Adicionar novo usuário
          </Button>
        </UserManagementDialog>
      </div>
    </>
  )
}
