import {
  doc,
  query,
  setDoc,
  getDoc,
  getDocs,
  orderBy,
  updateDoc,
  deleteDoc,
  collection,
  getFirestore,
  getCountFromServer,
} from 'firebase/firestore'

import { FirebaseApp } from '..'
import { FirebaseStorage } from '../storage'

import { DateFns } from '@/lib/date-fns'

import { v4 as uuid } from 'uuid'

interface ConstructorProps {
  collection: string
  bucket: string
}

export const AppFirestore = getFirestore(FirebaseApp)

export class FirestoreDatabase extends FirebaseStorage {
  public collection: string
  public paginationLimit = 10
  public database = AppFirestore
  public imageFields = ['imagePath']
  public defaultOrder: 'asc' | 'desc' = 'desc'

  public DateService = new DateFns()

  constructor({ collection, bucket }: ConstructorProps) {
    super({ bucket })
    this.collection = collection
  }

  public async createDocument(data: any) {
    try {
      data.id = uuid()
      data.createdAt = this.DateService.createDateFromNow({
        dateFormat: 'dd/MM/yyyy HH:mm:ss',
      })

      const timestamp = this.DateService.getSeconds()

      await setDoc(doc(this.database, this.collection, data.id), {
        ...data,
        timestamp,
      })
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  public async getDocumentByPrimaryKey<T>(id: string) {
    try {
      const document = await getDoc(doc(this.database, this.collection, id))

      return document.data() as T
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async updateDocumentByPrimaryKey(id: string, data: any) {
    try {
      await updateDoc(doc(this.database, this.collection, id), data)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async getAllDocuments<T>(page = 1) {
    try {
      const collectionReference = collection(this.database, this.collection)
      const orderedDocumentsQuery = query(
        collectionReference,
        orderBy('timestamp', this.defaultOrder),
      )

      const [countQuery, getDocuments] = await Promise.all([
        await getCountFromServer(collectionReference),
        await getDocs(orderedDocumentsQuery),
      ])

      const documentsQuantity = countQuery.data().count
      const documents = getDocuments.docs.map((doc) => doc.data()) as Array<T>

      const paginatedDocuments = documents.slice(
        (page - 1) * this.paginationLimit,
        page * this.paginationLimit,
      )

      return {
        documents: paginatedDocuments,
        quantity: documentsQuantity,
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async deleteDocumentByPrimaryKey<T>(id: string) {
    try {
      const getDocument = await getDoc(doc(this.database, this.collection, id))
      const document = getDocument.data() as any

      await Promise.all(
        this.imageFields.map(async (field) => {
          const image = document[field]

          if (image) {
            try {
              await this.deleteImageFromStorage({
                url: image,
              })
            } catch (error: any) {
              console.log(error)
            }
          }
        }),
      )

      await deleteDoc(doc(this.database, this.collection, id))
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async changeDocumentStatusByPrimaryKey(id: string, active: boolean) {
    try {
      const reference = doc(this.database, this.collection, id)
      console.log(reference)
      await updateDoc(reference, {
        active,
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
