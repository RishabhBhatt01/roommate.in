import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const OAuthSuccess = () => {
  const { refreshUser, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const sync = async () => {
      await refreshUser();

      // decide next step
      if (!user?.isProfileComplete) {
        navigate("/user-details", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    };

    sync();
  }, []);

  return <p>Signing you in…</p>;
};

export default OAuthSuccess;
