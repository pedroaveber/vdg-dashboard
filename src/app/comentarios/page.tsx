'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { commentServices } from './services'
import { Button, Input } from '@/components/FormComponents'

export default function Comments() {
  const [liveUrl, setLiveUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  async function handleEnterLive() {
    setIsLoading(true)
    const liveId = liveUrl.split('v=').pop()

    try {
      const data = await fetch(
        `${'https://yt.lemnoslife.com/noKey/'}videos?part=liveStreamingDetails&id=${liveId}`,
      )

      const dataJson = await data.json()
      const liveChatId = dataJson.items[0].liveStreamingDetails.activeLiveChatId
      await commentServices.startLive(liveChatId)

      router.push(`/comentarios/${liveId}?live-chat-id=${liveChatId}`)
    } catch (err: any) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-8">
      <div className="flex flex-col items-start justify-start gap-4 rounded-md border border-zinc-400 bg-white p-10 pt-8">
        <Input
          label="Insira a URL da live"
          type="text"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          placeholder="Insira a URL da live"
        />

        <Button
          onClick={handleEnterLive}
          className="w-full justify-center"
          disabled={!liveUrl || isLoading}
        >
          Entrar
        </Button>
      </div>
    </div>
  )
}
