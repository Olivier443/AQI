import { createContext, useEffect, useState } from "react";

// create a user Context
export const UserContext = createContext(null);

// create a provider component so that all children will access the user context
export const UserProvider = ({ children }) => {

  // when refreshing the page or navigating using http on routes,
  // it returns the loginUser object stored in browser session storage if exists
  const [currentUser, setCurrentUser] = useState(() => {
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser !== undefined) {
      return loginUser;
    }
    // If it does not exist, return null
    return null;
  })

  // Grab data from storage(can be null or actual user)
  useEffect(() => {
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser !== null && loginUser !== undefined) {
      // Set loginUser data to the provider
      setCurrentUser(loginUser);
    }
  }, []);

  // The provider needs to be wrapped around our application
  return (
    // Export the state so that children can access or set currenUser
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
};