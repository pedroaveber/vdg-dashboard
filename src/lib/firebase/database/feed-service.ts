import { FirestoreDatabase } from '.'

interface ConstructorProps {
  collection: string
  bucket: string
}

interface SendToWhatsappProps {
  id: string
}

class FeedClass extends FirestoreDatabase {
  override imageFields = ['imagePath', 'secondaryImagePath']

  constructor({ collection, bucket }: ConstructorProps) {
    super({ collection, bucket })
  }

  async publishFeed({ id }: SendToWhatsappProps) {
    // create function to send to whatsapp

    try {
      await this.updateDocumentByPrimaryKey(id, {
        published: true,
      })
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export const FeedService = new FeedClass({
  bucket: 'feeds',
  collection: 'feeds',
})
