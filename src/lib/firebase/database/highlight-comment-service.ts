import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  query,
  onSnapshot,
  collection,
  where,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore'
import { AppFirestore } from '.'
import { CommentType } from '@/@types/Database'

export class HighlightCommentClass {
  private collection = 'highlightComment'
  private database = AppFirestore

  public async setHighlightComment(data: any) {
    await setDoc(doc(this.database, this.collection, 'highlightComment'), data)
  }

  public async getHighlightComment() {
    const document = await getDoc(
      doc(this.database, this.collection, 'highlightComment'),
    )

    if (!document.exists()) {
      return null
    }

    return document.data() as CommentType
  }

  public async resetHighlightComment() {
    await deleteDoc(doc(this.database, this.collection, 'highlightComment'))
  }

  public async getCommentInRealTime(callback: (comment: CommentType) => void) {
    const q = query(
      collection(this.database, this.collection),
      where('isPaid', '==', true),
    )

    return onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          const data = change.doc.data() as CommentType
          callback(data)
        }
      })
    })
  }
}

export const HighlightCommentService = new HighlightCommentClass()

// useEffect(() => {
//   const q = query(collection(db, "comments"),
//       where('isPaid', '==', true));
//   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       querySnapshot.docChanges().forEach((change) => {
//           const data = change.doc.data();

//           if (change.type === "added") {

//           }
//           if (change.type === "modified") {

//           }
//           if (change.type === "removed") {

//           }
//       })
//   });
// }, [])
