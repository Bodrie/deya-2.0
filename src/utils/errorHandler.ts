import { ICustomError } from "../types/types";

export const errorHandler = (error: string): ICustomError => {
  switch (error) {
    case "auth/user-not-found": {
      return { error: 0, errorMsg: "Не е намерен такъв потребител" };
    }
    case "auth/invalid-email": {
      return { error: 0, errorMsg: "Невалиден имейл" };
    }
    case "auth/wrong-password": {
      return { error: 1, errorMsg: "Грешна парола" };
    }
    case "auth/internal-error": {
      return { error: 0, errorMsg: "Невалидни данни" };
    }
    case "auth/weak-password": {
      return { error: 1, errorMsg: "Паролата трябва да е по-дълга" };
    }
    case "auth/email-already-in-use": {
      return { error: 0, errorMsg: "Този имейл е зает" };
    }
    case "auth/missing-email": {
      return { error: 0, errorMsg: "Полето е задължително" };
    }
    default:
      return { error: undefined, errorMsg: undefined };
  }
};
