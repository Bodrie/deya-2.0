declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

interface Window {
    chrome: Chrome;
  }
  
  interface Chrome {
    webview: WebView2;
  }
  
  interface WebView2 {}