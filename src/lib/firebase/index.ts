import { initializeApp, getApps } from 'firebase/app'
import { FirebaseCredentials } from './config'

export const FirebaseApp =
  getApps().length === 0 ? initializeApp(FirebaseCredentials) : getApps()[0]
