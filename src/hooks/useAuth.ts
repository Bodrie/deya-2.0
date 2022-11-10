import { useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  getAuth,
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
    console.log('hre');
    
    navigate("/");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return userData;
};

export default useAuth;
