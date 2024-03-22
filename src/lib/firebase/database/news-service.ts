import { FirestoreDatabase } from '.'

interface ConstructorProps {
  collection: string
  bucket: string
}

class NewsClass extends FirestoreDatabase {
  constructor({ collection, bucket }: ConstructorProps) {
    super({ collection, bucket })
  }
}

export const NewsService = new NewsClass({
  bucket: 'news',
  collection: 'news',
})
