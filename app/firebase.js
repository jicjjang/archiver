import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import { DATABASE_URL } from './config'

Vue.use(VueFire)

const firebaseApp = Firebase.initializeApp({
  databaseURL: `${DATABASE_URL}/`
})

export const db = firebaseApp.database()
