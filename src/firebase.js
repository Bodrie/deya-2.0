import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  getDocs,
  collection,
  where,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import moment from "moment";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const {
  REACT_APP_FB_API_KEY,
  REACT_APP_FB_AUTH_DOMAIN,
  REACT_APP_FB_PROJECT_ID,
  REACT_APP_FB_STORAGE_BUCKET,
  REACT_APP_FB_MESSAGING_SENDER_ID,
  REACT_APP_FB_APP_ID,
  REACT_APP_FB_MEASUREMENT_ID,
  REACT_APP_FB_DATABASE_URL,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FB_API_KEY,
  authDomain: REACT_APP_FB_AUTH_DOMAIN,
  databaseURL: REACT_APP_FB_DATABASE_URL,
  projectId: REACT_APP_FB_PROJECT_ID,
  storageBucket: REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: REACT_APP_FB_APP_ID,
  measurementId: REACT_APP_FB_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const collRef = collection(db, "data");
export const userCollRef = collection(db, "userAppointments");

export const refreshDatabase = async () => {
  const pastDays = moment().subtract(1, "days").format("yyyy-MM-DD");
  const getPastDays = await getDocs(
    collRef,
    where("date", "==", `${pastDays}`)
  );
  getPastDays.forEach(() => {
    deleteDoc(doc(db, "data", `${pastDays}`));
  });
};

export const getCalendarData = async () => {
  let snapshotData = [];
  await getDocs(collRef, "data").then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      snapshotData.push({ ...doc.data() });
    });
  });
  return snapshotData;
};

export const getAppointmentData = async () => {
  let snapshotData = [];
  await getDocs(userCollRef, "userAppointments").then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      snapshotData.push({ ...doc.data() });
    });
  });
  return snapshotData;
};

export const appointmentCreate = async (
  appointmentDate,
  appointmentHour,
  userEmail
) => {
  await updateDoc(doc(db, "data", appointmentDate), {
    date: appointmentDate,
    hours: arrayRemove(appointmentHour + " - free"),
  });

  await updateDoc(doc(db, "data", appointmentDate), {
    date: appointmentDate,
    hours: arrayUnion(appointmentHour + " - " + userEmail),
  });
};

export const appointmentDelete = async (
  appointmentDate,
  appointmentHour,
  userEmail
) => {
  await updateDoc(doc(db, "data", appointmentDate), {
    date: appointmentDate,
    hours: arrayRemove(appointmentHour + " - " + userEmail),
  });

  await updateDoc(doc(db, "data", appointmentDate), {
    date: appointmentDate,
    hours: arrayUnion(appointmentHour + " - free"),
  });
};

export const createOrUpdateAvailableAppointments = async (
  appointmentsDate,
  appointmentHours
) => {
  await updateDoc(doc(db, "data", appointmentsDate), {
    date: appointmentsDate,
    hours: arrayUnion(...appointmentHours),
  });
};

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
