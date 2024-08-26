import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAKHcxc9asWK64IRDZNaTHOY--AY5bHdLo",
  authDomain: "e-commerce-website-30ad8.firebaseapp.com",
  projectId: "e-commerce-website-30ad8",
  storageBucket: "e-commerce-website-30ad8.appspot.com",
  messagingSenderId: "311609425944",
  appId: "1:311609425944:web:26b34c908a6abd30ca836d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };