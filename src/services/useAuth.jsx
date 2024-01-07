import { useState, useEffect, useContext, createContext } from 'react';
import { auth } from './firebase'; // Import your firebase configuration
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { UpdateUsersCollection } from './functions';

// Create a context for the authentication data
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Function to log in using Firebase
  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Optional: Navigate to home or another page after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Function to log out
  const logout = () => {
    return auth.signOut();
  };

  // Monitor the auth state change (login/logout)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // Save user data to local storage
        localStorage.setItem('name', user.displayName);
        localStorage.setItem('uid', user.uid)
        localStorage.setItem('photoURL', user.photoURL)
        localStorage.setItem('email', user.email)

        const update = async () => {
         await UpdateUsersCollection({
            name: user.displayName,
            uid: user.uid,
            image: user.photoURL,
            email: user.email
          });
        };
        
        update();

        setUser(user);

        // console.log("this is user is set ", user)
      } else {
        localStorage.removeItem('name');
        localStorage.removeItem('uid');
        localStorage.removeItem('photoURL');
        localStorage.removeItem('email');
        setUser(null);
        console.log("this is user is NOT set", user)
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const value = {
    user,
    setUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
