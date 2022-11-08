import { useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    });
    navigate("/");
  }, [auth]);

  return userData;
};

export default useAuth;
