import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../../Firebase/Firebase.config'


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const providerLogin = (provider) => {
    return signInWithPopup(auth, provider)
  }
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const updateUserInfo = userInfo => {
    setLoading(true)
    return updateProfile(auth.currentUser, userInfo)
  }
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('accessToken')
    return signOut(auth)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('user inside state change', currentUser);
      setUser(currentUser)
      setLoading(false);
    });
    return () => {
      unSubscribe();
    }
  }, [])

  const authInfo = {
    user,
    loading,
    setLoading,
    providerLogin,
    logOut,
    updateUserInfo,
    createUser,
    signIn
  };
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;