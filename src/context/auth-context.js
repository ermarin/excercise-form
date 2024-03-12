import { createContext, useState } from 'react';

export const AuthData = createContext(null);

function AuthContext({ children }) {
  const [token, setToken] = useState();

  return (
    <AuthData.Provider value={{ token, setToken }}>
      {children}
    </AuthData.Provider>
  );
}

export default AuthContext;
