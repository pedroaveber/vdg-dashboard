import { collection, doc, query, updateDoc, where } from 'firebase/firestore'
import { FirestoreDatabase } from '.'

interface ToggleItemToFavoritesByIdProps {
  id: string
  newStatus: boolean
}

interface ConstructorProps {
  collection: string
  bucket: string
}

class BannersClass extends FirestoreDatabase {
  public maxItems = 10

  constructor({ collection, bucket }: ConstructorProps) {
    super({ collection, bucket })
  }

  public async toggleBannerToFavoritesById({
    id,
    newStatus,
  }: ToggleItemToFavoritesByIdProps) {
    try {
      const docReference = doc(this.database, this.collection, id)
      await updateDoc(docReference, {
        highlighted: newStatus,
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

export const BannerService = new BannersClass({
  bucket: 'banners',
  collection: 'banners',
})
