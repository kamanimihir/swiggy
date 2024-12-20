
import React from "react";
import { auth, provider } from "../Confing/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removUserData } from "../utils/Authslic";
import { useNavigate } from "react-router-dom";


function Signin() {
  

  const dispatch = useDispatch()
  const naviget = useNavigate()
  const userData = useSelector((state) => state.authSlice.userData);
  async function handleAuth() {
    try {
      let data = await signInWithPopup(auth, provider);

      const userData = {
        name: data.user.displayName,
        photo: data.user.photoURL,
      };
      console.log(userData)
      dispatch(addUserData(userData))
      naviget("/Cart")


    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }

  async function handleLogout(){
    await signOut(auth);
    dispatch(removUserData())
  }

  return (
    <div>
      Login
      <button onClick={handleAuth} className="p-5 bg-slate-400 mt-5">
        Google login
      </button>
      {
        userData && <button onClick={handleLogout} className="p-5 bg-slate-400 mt-5">
        Logout
      </button>
      }
    </div>
  );
}

export default Signin;
