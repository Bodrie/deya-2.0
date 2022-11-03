import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  where,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDocsFromServer,
  query,
  FirestoreError,
  setDoc,
} from "firebase/firestore";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import moment from "moment";
import {
  IAppointment,
  IAppointmentCreateOrUpdate,
  ICalendar,
} from "./types/types";

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

export const refreshDatabase = async () => {
  const pastDays = moment().subtract(1, "days").format("yyyy-MM-DD");
  const getPastDays = await getDocsFromServer(
    query(collRef, where("date", "==", `${pastDays}`))
  );
  getPastDays.forEach(() => {
    deleteDoc(doc(db, "data", `${pastDays}`));
  });
};

export const getCalendarData = async () => {
  let snapshotData: ICalendar[] = [];
  await getDocsFromServer(collRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      const calendarData = doc.data();
      snapshotData.push(calendarData as ICalendar);
    });
  });
  return snapshotData;
};

export const appointmentCreate = async ({
  appointmentDate,
  appointmentHour,
  userEmail,
}: IAppointment): Promise<void> => {
  await updateDoc(doc(db, "data", appointmentDate), {
    date: appointmentDate,
    hours: arrayRemove(appointmentHour + " - free"),
  });

  await updateDoc(doc(db, "data", appointmentDate), {
    date: appointmentDate,
    hours: arrayUnion(appointmentHour + " - " + userEmail),
  });
};

export const appointmentDelete = async ({
  appointmentDate,
  appointmentHour,
  userEmail,
}: IAppointment): Promise<void> => {
  await updateDoc(doc(db, "data", appointmentDate), {
    date: appointmentDate,
    hours: arrayRemove(appointmentHour + " - " + userEmail),
  });

  await updateDoc(doc(db, "data", appointmentDate), {
    date: appointmentDate,
    hours: arrayUnion(appointmentHour + " - free"),
  });
};

export const createOrUpdateAvailableAppointments = async ({
  appointmentsDate,
  appointmentHours,
}: IAppointmentCreateOrUpdate): Promise<void> => {
  await updateDoc(doc(db, "data", appointmentsDate), {
    date: appointmentsDate,
    hours: arrayUnion(...appointmentHours),
  }).catch((error: FirestoreError) => {
    if (error.code === "not-found") {
      setDoc(doc(db, "data", appointmentsDate), {
        date: appointmentsDate,
        hours: arrayUnion(...appointmentHours),
      });
    } else {
      throw new Error(`${error.name}: ${error.message}`);
    }
  });
};

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
