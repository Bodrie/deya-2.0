import { Moment } from "moment";

export interface IAppointment {
  appointmentDate: string;
  appointmentHour: number;
  userEmail: string | null;
  isApproved: boolean;
  phone?: string | null;
  displayName?: string | null;
}

export interface IAppointmentUpdate {
  appointmentDate: string;
  appointmentHour: number;
  userEmail: string | null;
  isApproved: boolean;
  phone?: string | null;
  oldDisplayName?: string | null;
  newDisplayName?: string | null;
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
  available_hours: number[];
  appointments: NEWIAppointment[];
}

export interface NEWIAppointment {
  appointment_hour: number;
  display_name: string;
  is_approved: boolean;
  phone: string;
  user_email: string;
}

export interface IAppointmentCreateOrUpdate {
  appointmentsDate: string;
  appointmentHours: number[];
}

export interface IDateTimePicker {
  pageState: ICalendarPageState;
  calendarData: ICalendar[];
  dateValue: Moment | null;
  setDateValue: React.Dispatch<React.SetStateAction<ICalendarPageState>>;
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
  styles?: any;
}

export interface ICustomError {
  error: number | undefined;
  errorMsg: string | undefined;
}

export interface IPhoneState {
  prompt: boolean;
  consent: boolean;
  value: string;
  error: boolean;
}

export interface ICalendarPageState {
  selectedDate: Moment | null;
  calendarData: ICalendar[];
  savedDate: boolean;
  saveNewDate: boolean;
}
