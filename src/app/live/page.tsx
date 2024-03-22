'use client'

// Core
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Assets
import VdgIconPng from '@/assets/img/VDGIcon.png'
import SuperChatPng from '@/assets/img/SuperchatPng.png'
import YoutubeLogoPng from '@/assets/img/YoutubeLogo.png'
import VozDoGigante from '@/assets/img/VozDoGigantePng.png'

// Types
import type { CommentDTO } from '../comentarios/dtos'

// Libs
import { AppFirestore } from '@/lib/firebase/database'
import { query, where, collection, onSnapshot } from 'firebase/firestore'

// Query
import '@/styles/globals.css'

export default function Live() {
  const [data, setData] = useState<CommentDTO | null>(null)

  useEffect(() => {
    const q = query(
      collection(AppFirestore, 'highlight'),
      where('id', '==', 'highlighted'),
    )
    onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot)
      if (querySnapshot.empty) {
        setData(null)
      }

      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          setData(null)
        } else {
          const data = change.doc.data() as CommentDTO
          setData(data)
        }
      })
    })
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center antialiased">
      {data && (
        <div className="flex w-full max-w-[1600px] items-center">
          <div className="relative">
            <Image
              width={200}
              quality={100}
              height={200}
              alt="from"
              src={data.from === 'VDGAPP' ? VdgIconPng : YoutubeLogoPng}
              className="absolute left-0 top-0 z-10 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded border-2 border-white bg-black object-cover shadow-lg"
            />

            <img
              alt=""
              src={data.avatarUrl || 'https://github.com/pedroalbertoveber.png'}
              className="h-[320px] w-[320px] rounded-lg border-4 border-zinc-50 shadow-lg outline-1 outline-black"
            />
          </div>

          <div className="relative flex min-h-[200px] flex-1 flex-col items-start justify-start rounded-r-lg bg-gradient-to-br from-red-500 to-red-700 px-6 pb-[120px] pt-4 text-white ">
            <span className="text-[40px] font-bold">{data.username}</span>
            <p
              className="data-[text=long]:text-[24px]  data-[text=medium]:text-[28px]  data-[text=short]:text-[42px]"
              data-text={
                data.comment.length <= 100
                  ? 'short'
                  : data.comment.length <= 200
                    ? 'medium'
                    : 'long'
              }
            >
              {data.comment.length > 200
                ? data.comment.substring(0, 200) + '...'
                : data.comment}
            </p>

            {data.isPaid && data.from === 'YOUTUBE' && (
              <Image
                width={400}
                height={100}
                quality={100}
                src={SuperChatPng}
                alt="Superchat"
                className="absolute bottom-0 right-0 z-20 w-[400px] object-cover"
              />
            )}

            {data.isPaid && data.from === 'VDGAPP' && (
              <Image
                width={400}
                height={100}
                quality={100}
                src={VozDoGigante}
                alt="Voz do Gigante"
                className="absolute bottom-0 right-0 z-20 w-[400px] object-cover"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
