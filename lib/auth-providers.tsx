import { createContext, useContext } from "react";
import { useAppwrite } from "@/lib/useAppwrite";
import { getUser } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";

interface AuthType {
  isLoggedIn: boolean;
  user: User | undefined;
  loading: boolean;
  refetch: () => void;
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

const Auth = createContext<AuthType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getUser,
  });
  const isLoggedIn = !!user;
  return (
    <Auth.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        refetch,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => {
  const auth = useContext(Auth);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};
