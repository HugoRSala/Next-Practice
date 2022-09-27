import { initializeApp } from 'firebase/app'
import { getAuth, GithubAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth' 

const firebaseConfig = {
    apiKey: "AIzaSyBrywFaMv1R-v4v2gPF7LgGRFkdLGGoZMg",
    authDomain: "devter-cdfc0.firebaseapp.com",
    projectId: "devter-cdfc0",
    storageBucket: "devter-cdfc0.appspot.com",
    messagingSenderId: "567280331441",
    appId: "1:567280331441:web:c691ded116d01f3a7f9090",
    measurementId: "G-43JKEE1CR8"
};

const app = initializeApp(firebaseConfig)

const mapUser = (resp) => {
    
    console.log(resp);
    const { email, photoURL } = resp.user
    const { screenName } = resp.user.reloadUserInfo
    return {
        nombre: screenName,
        avatar: photoURL,
        mail: email
    }
}
export const onAuthStateChange = (onChange) => {
    return onAuthStateChanged(getAuth(), user => {
        const normalizedUser = 
        mapUser(user)
        onChange(normalizedUser)
    })
}

/* export const signInWithGithub = () => {
    const auth = getAuth(app)
    const githubprovider = new GithubAuthProvider()
    return signInWithPopup(auth, githubprovider)
        .then(mapUser)
} */

export const signInWithGithub = () => {
    const githubProvider = new GithubAuthProvider();
    githubProvider.setCustomParameters(firebaseConfig);
    const auth = getAuth();
    return signInWithPopup(auth, githubProvider)
    .then(mapUser)
  }
 




