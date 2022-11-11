import { Moment } from "moment";

export interface IAppointment {
  appointmentDate: string;
  appointmentHour: number;
  userEmail: string | null;
}

export interface IUserAppointments {
  date: string;
  hours: number;
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
