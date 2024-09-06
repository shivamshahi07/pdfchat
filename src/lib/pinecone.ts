import { PineconeClient } from '@pinecone-database/pinecone'

let pineconeClient: PineconeClient | null = null

export const getPineconeClient = async (): Promise<PineconeClient> => {
  if (pineconeClient) {
    return pineconeClient
  }

  pineconeClient = new PineconeClient()

  try {
    await pineconeClient.init({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: 'us-east-1',
    })
  } catch (error) {
    pineconeClient = null
    console.error('Failed to initialize Pinecone client:', error)
    throw error
  }

  return pineconeClient
}