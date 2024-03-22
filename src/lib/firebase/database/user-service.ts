import {
  doc,
  getDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
  setDoc,
} from 'firebase/firestore'

import { AppFirestore } from '.'
import { FirebaseStorage } from '../storage'

import type { UserType } from '@/@types/Database'
import { DateFns } from '@/lib/date-fns'

interface UpdateUserByIdProps {
  id: string
  data: Partial<UserType>
}

class UserClass extends FirebaseStorage {
  public collection = 'users'
  public DateService = new DateFns()

  private database = AppFirestore

  constructor() {
    super({ bucket: 'users' })
  }

  async getUserById(id: string) {
    try {
      const document = await getDoc(doc(this.database, this.collection, id))
      return document.data() as UserType
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateUserById({ data, id }: UpdateUserByIdProps) {
    console.log(data)
    try {
      await updateDoc(doc(this.database, this.collection, id), data)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getUserByEmail(email: string): Promise<UserType | null> {
    try {
      const usersRef = collection(this.database, this.collection)
      const userByEmailQuery = query(usersRef, where('email', '==', email))

      const document = await getDocs(userByEmailQuery)

      if (!document.docs) {
        return null
      }

      return document.docs[0].data() as UserType
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async createDefaultUser(
    user: Omit<
      UserType,
      | 'createdAt'
      | 'timestamp'
      | 'name'
      | 'role'
      | 'active'
      | 'firstAccess'
      | 'avatar'
    >,
  ) {
    try {
      await setDoc(doc(this.database, this.collection, user.id), {
        ...user,
        name: '',
        role: 'admin',
        active: true,
        firstAccess: true,
        avatar: null,
        createdAt: this.DateService.createDateFromNow({
          dateFormat: 'dd/MM/yyyy HH:mm:ss',
        }),
        timestamp: this.DateService.getSeconds(),
      })
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  async setUserAdminById(id: string, policy?: string[]) {
    try {
      await updateDoc(doc(this.database, this.collection, id), {
        role: 'admin',
        policy: policy || [],
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateUserPolicyById(id: string, policy: string[]) {
    try {
      await updateDoc(doc(this.database, this.collection, id), {
        policy,
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getAllAdmins() {
    try {
      const usersRef = collection(this.database, this.collection)
      const usersQuery = query(usersRef, where('role', '==', 'admin'))

      const document = await getDocs(usersQuery)
      return document.docs.map((doc) => doc.data()) as UserType[]
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }
}

export const UserService = new UserClass()
