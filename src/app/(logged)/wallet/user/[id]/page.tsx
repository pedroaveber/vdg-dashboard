'use client'

import { Anchor } from '@/components/Anchor'
import { Button } from '@/components/FormComponents'
import { LucideChevronLeft } from 'lucide-react'
import { RiFilePdf2Fill } from 'react-icons/ri'
import { GiSandsOfTime } from 'react-icons/gi'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFFile } from './pdf-file'
import { useQuery } from '@tanstack/react-query'
import { usersServices } from '../../services'
import { WalletPresenters } from '../../presenters'
import Link from 'next/link'

type PageProps = {
  params: {
    id: string
  }
}

export default function Page({ params }: PageProps) {
  const { data, error, isLoading } = useQuery({
    queryFn: async () => {
      const response = await usersServices.getUserPurchases(params.id)

      if (response) {
        return response.historic.map(WalletPresenters.fromUserPurchases)
      }

      return null
    },
    queryKey: ['user-purchases', params.id],
  })

  if (isLoading) return <p>Carregando informações...</p>

  if (error) throw new Error('Erro ao buscar informações do usuário')

  return (
    <div className="my-8 flex w-full max-w-[1200px] flex-col items-start px-4 pb-16">
      <Anchor href="/wallet" variant="outline" className="w-auto">
        <LucideChevronLeft size={24} />
        Voltar
      </Anchor>

      {!data ? (
        <div className="flex h-[300px] w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-lg">
              Este usuário não possui nenhuma movimentação
            </span>

            <Link
              href="/wallet"
              className="text-red-400 underline underline-offset-4 hover:text-red-600"
            >
              voltar para wallet
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8 flex w-full items-center justify-between gap-4">
            <div className="flex items-center justify-start gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {/* <img
                  alt=""
                  src={mockUser.avatarUrl}
                  className="h-16 w-16 rounded-full object-cover"
                /> */}

              <div>
                {/* <span className="block font-bold">{mockUser.name}</span>
                  <span className="block text-sm">{mockUser.email}</span> */}
              </div>
            </div>

            <PDFDownloadLink
              document={<PDFFile />}
              // fileName={`Relatório de transações de ${mockUser.name}`}
            >
              {({ loading }) =>
                loading ? (
                  <GiSandsOfTime size={20} className="formDeleteItemButton" />
                ) : (
                  <Button variant="ghost" className="ml-auto w-auto">
                    <RiFilePdf2Fill size={24} />
                  </Button>
                )
              }
            </PDFDownloadLink>
          </div>

          <table className="mt-8 w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b border-zinc-300 py-2 text-left">
                  Descrição
                </th>
                <th className="border-b border-zinc-300 py-2 text-left">
                  Data da movimentação
                </th>
                <th className="border-b border-zinc-300 py-2 text-left">
                  Tipo da movimentação
                </th>
                <th className="border-b border-zinc-300 py-2 text-left">
                  Valor
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={`transaction-${index}`} className="w-full">
                    <td className="border-b border-dashed border-zinc-300 py-1">
                      Super chat
                    </td>
                    <td className="border-b border-dashed border-zinc-300 py-1">
                      {item.createdAt}
                    </td>
                    <td className="border-b border-dashed border-zinc-300 py-1">
                      DÉBITO
                    </td>
                    <td className="border-b border-dashed border-zinc-300 py-1">
                      {item.price}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
