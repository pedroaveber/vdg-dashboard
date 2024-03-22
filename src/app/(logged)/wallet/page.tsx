'use client'

import { GeneralTransactions } from './general-transactions'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/UI/tabs'
import { Users } from './users'

export default function Wallet() {
  return (
    <div className="my-8 flex w-full max-w-[1200px] flex-col px-4 pb-16">
      <Tabs className="w-full" defaultValue="by-user">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="by-user">Por usuário</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralTransactions />
        </TabsContent>

        <TabsContent value="by-user">
          <Users />
        </TabsContent>
      </Tabs>
    </div>
  )
}
