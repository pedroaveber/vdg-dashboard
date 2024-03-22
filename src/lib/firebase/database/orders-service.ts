// import {
//   doc,
//   query,
//   getDoc,
//   getDocs,
//   orderBy,
//   collection,
//   getFirestore,
// } from 'firebase/firestore'

// import { FirebaseApp } from '..'
// import { OrderType } from '@/@types/Database'
// import { OrderPresenter } from '../presenters/order-presenter'

// interface ConstructorProps {
//   collection: string
//   bucket: string
// }

// export const AppFirestore = getFirestore(FirebaseApp)

// export class FirestoreDatabase {
//   public collection: string
//   public database = AppFirestore

//   constructor({ collection }: ConstructorProps) {
//     this.collection = collection
//   }

//   public async getDocumentByPrimaryKey<T>(id: string) {
//     try {
//       const document = await getDoc(doc(this.database, this.collection, id))

//       return document.data() as T
//     } catch (error: any) {
//       throw new Error(error.message)
//     }
//   }

//   public async getAllDocuments() {
//     try {
//       const collectionReference = collection(this.database, this.collection)
//       const orderedDocumentsQuery = query(
//         collectionReference,
//         orderBy('timestamp', 'desc'),
//       )

//       const getDocuments = await getDocs(orderedDocumentsQuery)

//       const documents = getDocuments.docs.map((doc) => doc.data()) as Array<{
//         id: string
//         orders: OrderType[]
//       }>

//       const orders = documents.map((document) => document.orders)

//       return {
//         documents: documents.map((document) =>
//           document.orders.map(OrderPresenter.toHTTP(order)),
//         ),
//       }
//     } catch (error: any) {
//       throw new Error(error.message)
//     }
//   }
// }
