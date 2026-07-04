import {client} from '@/sanity/lib/client'
import {getToken} from '@/sanity/lib/token'
import {defineEnableDraftMode} from 'next-sanity/draft-mode'
import {connection} from 'next/server'

export async function GET(request: Request) {
  await connection()

  const handler = defineEnableDraftMode({
    client: client.withConfig({token: getToken()}),
  }).GET

  return handler(request)
}
