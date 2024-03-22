import { FirestoreDatabase } from '.'

interface ConstructorProps {
  collection: string
  bucket: string
}

class CovenantClass extends FirestoreDatabase {
  override imageFields = ['imagePath', 'logoPath']
  override defaultOrder: 'asc' | 'desc' = 'asc'

  constructor({ collection, bucket }: ConstructorProps) {
    super({ collection, bucket })
  }
}

export const CovenantsService = new CovenantClass({
  bucket: 'covenants',
  collection: 'covenants',
})
