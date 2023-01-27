import { createContext } from "react";

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (state: boolean) => {},
});
export default LoadingContext;
