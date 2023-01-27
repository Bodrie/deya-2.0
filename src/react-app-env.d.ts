import { RecaptchaVerifier } from "firebase/auth";
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }

  module "*.png";
  module "*.svg";
  module "*.jpeg";
  module "*";
}
