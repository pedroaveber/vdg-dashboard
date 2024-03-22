import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore'

import { FirebaseApp } from '..'

interface ConstructorProps {
  collection: string
}

export const AppFirestore = getFirestore(FirebaseApp)

export class ConfigurationClass {
  public collection: string
  public database = AppFirestore

  constructor({ collection }: ConstructorProps) {
    this.collection = collection
  }

  async updateDashboardConfig(data: any) {
    try {
      const docReference = doc(
        this.database,
        this.collection,
        'general-configurations',
      )
      await updateDoc(docReference, data)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getDashboardConfig<T>() {
    try {
      const docReference = doc(
        this.database,
        this.collection,
        'general-configurations',
      )
      const docSnap = await getDoc(docReference)
      return docSnap.data() as T
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

export const ConfigurationsService = new ConfigurationClass({
  collection: 'configurations',
})
