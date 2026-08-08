import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Important: wait until localStorage has been checked
  const [loading, setLoading] = useState(true);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  useEffect(() => {
    const restoreAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (
          storedUser &&
          storedUser !== "undefined" &&
          storedToken &&
          storedToken !== "undefined"
        ) {
          const parsedUser = JSON.parse(storedUser);

          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Invalid authentication data:", error);

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
      } finally {
        // Authentication check is complete
        setLoading(false);
      }
    };

    restoreAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}