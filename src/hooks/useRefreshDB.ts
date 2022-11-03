import { useEffect } from "react";
import { REFRESH_RATE_OF_DB } from "../constants/constants";
import { refreshDatabase } from "../firebase";

const useRefreshDB = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      refreshDatabase();
    }, REFRESH_RATE_OF_DB);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);
};

export default useRefreshDB;
