import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import {
  getFirestore,
  collection,
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
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  UserCredential,
  updatePhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  User,
} from "firebase/auth";
import moment from "moment";
import {
  IAppointment,
  IAppointmentCreateOrUpdate,
  ICalendar,
  ICustomError,
} from "./types/types";
import { errorHandler } from "./utils/errorHandler";
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
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const collRef = collection(db, "data");
const auth = getAuth();
auth.useDeviceLanguage();

export const getUpdatedUser = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    const phone = user.phoneNumber;
    return phone;
  }
};

export const updateProfilePhoneNumber = async (phoneNumber: string) => {
  const appVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
    },
    auth
  );

  const provider = new PhoneAuthProvider(auth);
  const providerRes = await provider
    .verifyPhoneNumber(phoneNumber, appVerifier)
    .then((verificationId) => {
      const verificationCode = window.prompt(
        "Изпратихме код за потвърждение. Моля въведете го в полето по-долу."
      );

      const phoneCredential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode as string
      );

      const isUpdatedResponse = updatePhoneNumber(
        auth.currentUser as User,
        phoneCredential
      ).catch((error: FirestoreError) => {
        return errorHandler(error.code);
      });
      return isUpdatedResponse;
    })
    .catch((error) => {
      if (error) appVerifier.clear();
    });

  return providerRes as ICustomError;
};

export const refreshDatabase = async () => {
  const getPastDays = await getDocsFromServer(query(collRef)).catch(
    (error: FirestoreError) => {
      throw new Error(`${error.name}: ${error.message}`);
    }
  );
  getPastDays.forEach((docu) => {
    const currDateToCheck = moment(docu.id);
    const isBeforeCurrDate = moment(currDateToCheck).isBefore(moment(), "day");
    if (isBeforeCurrDate) {
      deleteDoc(doc(db, "data", docu.id)).catch((error: FirestoreError) => {
        throw new Error(`${error.name}: ${error.message}`);
      });
    }
  });
};

export const getCalendarData = async () => {
  let snapshotData: ICalendar[] = [];
  await getDocsFromServer(collRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const calendarData = doc.data();
        snapshotData.push(calendarData as ICalendar);
      });
    })
    .catch((error: FirestoreError) => {
      throw new Error(`${error.name}: ${error.message}`);
    });
  return snapshotData;
};

export const appointmentCreate = async ({
  appointmentDate,
  appointmentHour,
  userEmail,
  isApproved,
  displayName,
  phone,
}: IAppointment): Promise<void> => {
  await updateDoc(doc(db, "data", appointmentDate), {
    date: appointmentDate,
    hours: arrayRemove(appointmentHour + " - free"),
  }).catch((error: FirestoreError) => {
    throw new Error(`${error.name}: ${error.message}`);
  });

  await updateDoc(doc(db, "data", appointmentDate), {
    date: appointmentDate,
    hours: arrayUnion(
      appointmentHour +
        " - " +
        userEmail +
        " - " +
        isApproved +
        " - " +
        displayName +
        " - " +
        phone
    ),
  }).catch((error: FirestoreError) => {
    throw new Error(`${error.name}: ${error.message}`);
  });
};

export const appointmentDelete = async ({
  appointmentDate,
  appointmentHour,
  userEmail,
  isApproved,
  displayName,
  phone,
}: IAppointment): Promise<void> => {
  await updateDoc(doc(db, "data", appointmentDate), {
    date: appointmentDate,
    hours: arrayRemove(
      appointmentHour +
        " - " +
        userEmail +
        " - " +
        isApproved +
        " - " +
        displayName +
        " - " +
        phone
    ),
  }).catch((error: FirestoreError) => {
    throw new Error(`${error.name}: ${error.message}`);
  });

  await updateDoc(doc(db, "data", appointmentDate), {
    date: appointmentDate,
    hours: arrayUnion(appointmentHour + " - free"),
  }).catch((error: FirestoreError) => {
    throw new Error(`${error.name}: ${error.message}`);
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

export const signUp = (
  email: string,
  password: string
): Promise<UserCredential | ICustomError> => {
  return createUserWithEmailAndPassword(auth, email, password).catch(
    (error: FirestoreError) => {
      const isError = errorHandler(error.code);
      return isError as ICustomError;
    }
  );
};

export const signIn = (
  email: string,
  password: string
): Promise<UserCredential | ICustomError> => {
  return signInWithEmailAndPassword(auth, email, password).catch(
    (error: FirestoreError) => {
      const isError = errorHandler(error.code);
      return isError as ICustomError;
    }
  );
};

export const signInWithFacebook = () => {
  signInWithRedirect(auth, facebookProvider);
};
export const signInWithGoogle = () => {
  signInWithRedirect(auth, googleProvider);
};

logEvent(analytics, "notification_received");

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

/* 
Firebase notes:
https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#error-codes - For auth error handling
https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#getredirectresult - Get redirect result for acc linking
https://stackoverflow.com/questions/72286135/firebase-check-if-an-user-is-already-registered-in-database
*/
