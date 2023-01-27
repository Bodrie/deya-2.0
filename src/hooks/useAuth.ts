import { useEffect, useState, useContext } from "react";
import { User, onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoadingContext from "../context/LoadingContext";

const useAuth = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        setIsEmailVerified(user.emailVerified);
        setIsLoading(false);
        if (user.emailVerified) {
          navigate("/");
        }
      } else {
        setIsLoading(false);
        setUserData(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return { userData, isEmailVerified };
};

export default useAuth;
