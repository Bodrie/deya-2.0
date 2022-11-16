import { Moment } from "moment";

export interface IAppointment {
  appointmentDate: string;
  appointmentHour: number;
  userEmail: string | null;
  isApproved: string;
  phone?: string | null;
  displayName?: string | null;
}

export interface IUserAppointments {
  id?: number;
  date: string;
  hours: number;
  isApproved: boolean;
  email?: string;
  displayName?: string | null;
  phone?: string | null;
}

export interface ICalendar {
  date: string;
  hours: string[];
}

export interface IAppointmentCreateOrUpdate {
  appointmentsDate: string;
  appointmentHours: string[];
}

export interface IDateTimePicker {
  calendarData: ICalendar[];
  dateValue: Moment | null;
  setDateValue: React.Dispatch<React.SetStateAction<moment.Moment | null>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  disabled: boolean;
}

export interface ICarouselItems {
  name: string;
  description: string;
  img: any;
}

export interface ICardContent {
  title: string;
  content: string;
  img: string;
}

export interface ICustomError {
  error: number | undefined;
  errorMsg: string | undefined;
}
