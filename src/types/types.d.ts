export interface IAppointment {
  appointmentDate: string;
  appointmentHour: number;
  userEmail: string;
}

export interface IAppointmentCreateOrUpdate {
  appointmentsDate: string;
  appointmentHours: string[];
}

export interface FormElements extends HTMLFormControlsCollection {
  date: HTMLInputElement;
  hours: HTMLInputElement;
}

export interface IAdminFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
