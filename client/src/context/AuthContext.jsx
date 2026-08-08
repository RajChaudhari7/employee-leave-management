import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // =========================
  // LOGIN
  // =========================
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  // =========================
  // RESTORE AUTH ON REFRESH
  // =========================
  useEffect(() => {
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
      console.error("Failed to restore authentication:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setUser(null);
    } finally {
      // VERY IMPORTANT
      // Authentication restoration is finished
      setAuthLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}