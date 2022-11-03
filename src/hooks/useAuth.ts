import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const useAuth = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const auth = getAuth();
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
