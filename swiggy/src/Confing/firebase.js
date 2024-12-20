
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth/web-extension";


const firebaseConfig = {
  apiKey: "AIzaSyDiwo5wP4ueEJNWLSWmLsAfBddr0ucnu6w",
  authDomain: "siggy-31fc0.firebaseapp.com",
  projectId: "siggy-31fc0",
  storageBucket: "siggy-31fc0.firebasestorage.app",
  messagingSenderId: "807262870570",
  appId: "1:807262870570:web:760cd673508cb50680f753",
  measurementId: "G-MEL05Y54K3",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
 const provider = new GoogleAuthProvider()

 export { auth, provider };