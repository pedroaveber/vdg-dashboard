import { FirestoreDatabase } from '.'

interface ConstructorProps {
  collection: string
  bucket: string
}

class ChroniclesClass extends FirestoreDatabase {
  constructor({ collection, bucket }: ConstructorProps) {
    super({ collection, bucket })
  }
}

export const ChroniclesService = new ChroniclesClass({
  bucket: 'chronicles',
  collection: 'chronicles',
})
