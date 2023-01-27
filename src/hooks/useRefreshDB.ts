import { useEffect } from "react";
import { refreshDatabase } from "../firebase";

const useRefreshDB = () => {
  useEffect(() => {
    const intervalID = setInterval(() => {
      refreshDatabase();
    }, 60000 * 10);
     return () => clearInterval(intervalID);
  }, []);
};

export default useRefreshDB;
