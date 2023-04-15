import './App.css'
import { GithubAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState(null)

  const githubSignInHandler = () => {
    signInWithPopup(auth, githubProvider)
    .then((result) => {
      const loggedUser = result.user;
      setUser(loggedUser)
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const signInHandler = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const loggedUser = result.user;
      setUser(loggedUser)
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const signOutHandler = () => {
    signOut(auth)
    .then((result) => {
      console.log(result);
      setUser(null)
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <div className="App">
      <h1>Firebase + React</h1>
      <div className="card">
        {
          user ? 
          <button onClick={signOutHandler}>Sign Out</button>
          : <div>
            <button onClick={signInHandler}>Sign In</button>
            <button onClick={githubSignInHandler}>Github Sign In</button>
          </div>
        }
        {
          user && <div>
            <h2>UserName: {user.displayName}</h2>
            <p>Email: {user.email}</p>
            <img src={user.photoURL} alt="" />
          </div>
        }
      </div>
    </div>
  )
}

export default App
