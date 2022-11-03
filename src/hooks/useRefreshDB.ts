import { useEffect } from "react";
import { refreshDatabase } from "../firebase";

const useRefreshDB = () => {
  const MINUTE_MS = 10000;
  useEffect(() => {
    const interval = setInterval(() => {
      refreshDatabase();
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);
};

export default useRefreshDB;
