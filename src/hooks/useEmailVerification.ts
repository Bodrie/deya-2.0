import { getAuth, sendEmailVerification, User } from "firebase/auth";
import { useEffect } from "react";
const useEmialVerification = (userData: User | null) => {
  useEffect(() => {
    if (userData !== null && !userData.emailVerified) {
      sendEmailVerification(userData);
    }
  }, []);
};

export default useEmialVerification;
