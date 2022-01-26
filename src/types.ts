//Patients

export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[] | [];
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

///Diagnoses
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface DischargeInfo {
  date: string;
  criteria: string;
}

interface Hospital extends BaseEntry {
  type: "Hospital";
  discharge: DischargeInfo;
}

interface SickLeaveInfo {
  startDate: string;
  endDate: string;
}
interface OccupationalHealthcare extends BaseEntry {
  type: "OccupationalHealthcare";
  sickLeave?: SickLeaveInfo;
}

export type Entry = HealthCheckEntry | Hospital | OccupationalHealthcare;
