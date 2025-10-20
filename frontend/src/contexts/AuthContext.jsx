import { createContext, useEffect, useReducer } from "react";
import axios from "axios"; // ✅ You must import axios

// Create context
const AuthContext = createContext();

// Reducer for login/logout
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      console.log("LOGIN action hit", action.payload);
      return { user: action.payload };

    case "LOGOUT":
      localStorage.removeItem("user");
      console.log("LOGOUT action hit");
      return { user: null };

    default:
      return state;
  }
};

// Provider
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: JSON.parse(localStorage.getItem("user")) || null, // ✅ Restore from localStorage on first load
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/admins/me");
        const user = res.data;
        if (user) {
          dispatch({ type: "LOGIN", payload: user });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        console.error("Auth check failed:", error.message);
        dispatch({ type: "LOGOUT" });
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
