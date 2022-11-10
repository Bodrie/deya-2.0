import { useEffect, useState } from "react";
import { User, onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        setIsEmailVerified(user.emailVerified);
      } else {
        setUserData(null);
      }
    });
    if (isEmailVerified) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return { userData, isEmailVerified };
};

export default useAuth;
