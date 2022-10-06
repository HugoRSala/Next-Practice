import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore'
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBrywFaMv1R-v4v2gPF7LgGRFkdLGGoZMg',
  authDomain: 'devter-cdfc0.firebaseapp.com',
  projectId: 'devter-cdfc0',
  storageBucket: 'devter-cdfc0.appspot.com',
  messagingSenderId: '567280331441',
  appId: '1:567280331441:web:c691ded116d01f3a7f9090',
  measurementId: 'G-43JKEE1CR8',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const mapUserFromFirebase = (user) => {
  const { email, photoURL, uid } = user
  const { screenName } = user.reloadUserInfo
  return {
    nombre: screenName,
    avatar: photoURL,
    mail: email,
    uid,
  }
}
export const onAuthStateChange = (onChange) => {
  return onAuthStateChanged(getAuth(), (user) => {
    const normalizedUser = user ? mapUserFromFirebase(user) : null
    onChange(normalizedUser)
  })
}

export const signInWithGithub = async () => {
  const auth = getAuth(app)
  const githubprovider = new GithubAuthProvider()
  return signInWithPopup(auth, githubprovider).then(mapUserFromFirebase)
}

export const addTweet = ({ avatar, userName, userId, content }) => {
  return addDoc(collection(db, 'tweets'), {
    avatar,
    userName,
    userId,
    content,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}
