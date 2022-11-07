import { useEffect } from "react";
import { refreshDatabase } from "../firebase";

const useRefreshDB = () => {
  useEffect(() => {
    refreshDatabase();
  }, []);
};

export default useRefreshDB;
