import { create } from "zustand";

async function loginUser(username: string, password: string) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
}

async function registerUser(username: string, password: string) {
  try {
    const response = await fetch("/api/auth/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to register:", error);
    throw error;
  }
}

interface AuthState {
  userId: string | null;
  accessToken: string | null;
  userRole: string | null;
  loginHandler: (userId: string, accessToken: string) => Promise<void>;
  registerHandler: (username: string, password: string) => Promise<void>;
  logoutHandler: () => void;
}

const AuthStore = create<AuthState>((set) => ({
  userId: localStorage.getItem("userId") || null,
  accessToken: localStorage.getItem("accessToken") || null,
  userRole: localStorage.getItem("userRole") || null,
  clearCredentials: () => set({ userId: null, accessToken: null }),
  loginHandler: async (username, password) => {
    try {
      const res = await loginUser(username, password);
      const {
        user: { id: userId, userRole },
        accessToken,
      } = res.value;
      console.log(res);

      set({ userId, accessToken, userRole });

      localStorage.setItem("userId", userId);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userRole", userRole);
    } catch (error) {
      console.error("Login failed:", error);
      set({ userId: null, accessToken: null, userRole: null });
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
    }
  },
  registerHandler: async (username: string, password: string) => {
    try {
      await registerUser(username, password);
      const res = await loginUser(username, password);
      const {
        user: { id: userId, userRole },
        accessToken,
      } = res.value;
      console.log(userId, accessToken);

      set({ userId, accessToken, userRole });

      localStorage.setItem("userId", userId);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userRole", userRole);
    } catch (error) {
      console.error("Registration failed:", error);
      set({ userId: null, accessToken: null, userRole: null });
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
    }
  },
  logoutHandler: () => {
    set({ userId: null, accessToken: null, userRole: null });
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
  },
}));

export default AuthStore;
