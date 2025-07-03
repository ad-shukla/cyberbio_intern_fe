// Import React hooks and types
//we added this file - wasnt there before
//this file is acting like store for JWT, syncing localstorage so even 
//if session is reloaded, token remains
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
// Define the shape of the auth context
//token is basically the current JWT
//settoken is to update the token
type AuthCtx = {
  token: string | null;
  setToken: (tk: string | null) => void;
};
// Create AuthContext with undefined initial value
const AuthContext = createContext<AuthCtx | undefined>(undefined);
// Provide auth context to component tree
export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize token state from localStorage so refresh would keep session
  const [token, _setToken] = useState<string | null>(() => {
    return sessionStorage.getItem('mh_token');
  });
  // helper to update token state and localStorage
  const setToken = (tk: string | null) => {
    if (tk) {
      // Store token in localStorage
      sessionStorage.setItem('mh_token', tk);
    } else {
      // Remove token from localStorage
      sessionStorage.removeItem('mh_token');
    }
    // Update state
    _setToken(tk);
  };
  // Sync token across tabs, if new pages were opened 
  useEffect(() => {
    const handler = () => _setToken(sessionStorage.getItem('mh_token'));
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  });
  // helper provider with token and setter in context
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
// Custom hook to consume auth context
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>'); // Ensure hook is used within provider
  return ctx; // Return context value
}