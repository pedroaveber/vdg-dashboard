import { FirebaseApp } from './index'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
} from 'firebase/auth'

interface IEmailAndPassword {
  email: string
  password: string
}

class FirebaseAuthentication {
  public auth = getAuth(FirebaseApp)

  async signInWithEmailAndPassword({ email, password }: IEmailAndPassword) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      )
      return userCredential
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async signOut() {
    try {
      await this.auth.signOut()
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async createNewUserWithEmailAndPassword({
    email,
    password,
  }: IEmailAndPassword) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      )
      return userCredential
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateUserPassword(password: string) {
    const currentUser = this.auth.currentUser

    if (currentUser) {
      try {
        await updatePassword(currentUser, password)
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    } else {
      throw new Error('Usuário não encontrado!')
    }
  }

  async sendPasswordResetEmail(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

export const FirebaseAuth = new FirebaseAuthentication()
