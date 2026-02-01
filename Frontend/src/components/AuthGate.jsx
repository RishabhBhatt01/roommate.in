import { useAuth } from "../context/authContext";

const AuthGate = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return null; // or a loader
  }

  return children;
};

export default AuthGate;
