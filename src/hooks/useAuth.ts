import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { authStateTracker } from "../firebase";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const userResponse = authStateTracker();
    setUserData(userResponse);
    navigate("/");
  }, []);
  return userData;
};

export default useAuth;
