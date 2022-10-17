import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  query,
  getDocs,
  orderBy,
} from 'firebase/firestore'
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage'

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
const storage = getStorage()

const mapUserFromFirebase = (user) => {
  console.log(user)
  const { email, photoURL, uid } = user
  const { screenName } = user.reloadUserInfo
  const { displayName } = user.reloadUserInfo.providerUserInfo[0]
  return {
    nombre: displayName,
    userName: screenName,
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

export const signInWithGithub = () => {
  const auth = getAuth(app)
  const githubprovider = new GithubAuthProvider()
  return signInWithPopup(auth, githubprovider).then(mapUserFromFirebase)
}

export const addTweet = ({
  avatar,
  userName,
  userId,
  content,
  screenName,
  img,
}) => {
  return addDoc(collection(db, 'tweets'), {
    avatar,
    userName,
    userId,
    content,
    img,
    screenName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLastTweets = () => {
  return getDocs(
    query(collection(db, 'tweets'), orderBy('createdAt', 'desc'))
  ).then((snapshot) => {
    return snapshot.docs.map((doc) => {
      // transformar este objeto complejo data de fb en un objeto plano
      const data = doc.data()
      const { createdAt } = data
      const id = doc.id
      return {
        ...data,
        createdAt: +createdAt.toDate(),
        id,
      }
    })
  })
}

export const subirImagen = (archivo) => {
  const storageRef = ref(storage, `images/${archivo.name}`)
  const uploadTask = uploadBytesResumable(storageRef, archivo)
  console.log(uploadTask)
  return uploadTask
}
