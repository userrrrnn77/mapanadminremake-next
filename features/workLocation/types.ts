export type WorkRole =
  | "security"
  | "cleaning_service"
  | "customer_service"
  | "gardener"
  | "street";

export interface ShiftTime {
  hour: number;
  minute: number;
  endHour: number;
  endMinute: number;
}

export interface IWorkLocationFE {
  _id: string;
  code: string;
  role: WorkRole;
  name: string;
  center: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  radiusMeter: number;
  isActive: boolean;
  shiftConfigs: {
    weekday: { pagi: ShiftTime; siang: ShiftTime; malam: ShiftTime };
    weekend: { pagi: ShiftTime; siang: ShiftTime; malam: ShiftTime };
  };
  createdAt?: string;
}

export const WORK_ROLES = [
  "security",
  "cleaning_service",
  "customer_service",
  "gardener",
  "street",
] as const;

interface ShiftGroup {
  pagi: ShiftTime;
  siang: ShiftTime;
  malam: ShiftTime;
}

export interface IWorkLocation {
  code: string;
  role: WorkRole;

  name: string;

  center: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };

  radiusMeter: number;
  isActive: boolean;

  shiftConfigs: {
    weekday: ShiftGroup;
    weekend: ShiftGroup;
  };

  createdAt?: string;
  updatedAt?: string;
}
