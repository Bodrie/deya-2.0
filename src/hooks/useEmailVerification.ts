import { sendEmailVerification, User } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useEmialVerification = (userData: User | null) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (userData !== null && !userData.emailVerified) {
      sendEmailVerification(userData).then(() => navigate("/verification"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
};

export default useEmialVerification;
