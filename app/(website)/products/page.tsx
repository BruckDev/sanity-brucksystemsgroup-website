import {ApiAgentProductPage} from '@/components/site/ApiAgentProductPage'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'api-agent is an adaptable core for developing agents with readable flows, guided tooling, and traceable evidence.',
}

export default function ProductsPage() {
  return <ApiAgentProductPage />
}
