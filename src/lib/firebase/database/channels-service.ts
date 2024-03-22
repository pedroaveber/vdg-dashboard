import { FirestoreDatabase } from '.'

interface ConstructorProps {
  collection: string
  bucket: string
}

class Channels extends FirestoreDatabase {
  constructor({ bucket, collection }: ConstructorProps) {
    super({ bucket, collection })
  }
}

export const ChannelsService = new Channels({
  bucket: 'channels',
  collection: 'channels',
})
