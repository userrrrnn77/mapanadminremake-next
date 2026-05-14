export interface createUser {
  username: string;
  fullname: string;
  phone: string;
  password: string;
  role: string;
  assignedWorkLocations: string[];
}

export interface userAssignment {
  role?: string;
  assignedWorkLocations?: string[] | string;
  password?: string;
}

// features/user/types.ts
import { IWorkLocationFE } from "../workLocation/types";

export const USER_ROLES = [
  "admin",
  "security",
  "cleaning_service",
  "customer_service",
  "gardener",
  "street",
] as const;

export const SHIFTS = ["pagi", "siang", "malam"] as const;

export type Role = (typeof USER_ROLES)[number];
export type Shift = (typeof SHIFTS)[number];

export interface IUser {
  _id: string;
  username: string;
  fullname: string;
  phone: string;
  role: Role;
  shift: Shift;
  profilePhoto: {
    url: string;
    publicId: string;
  };
  assignedWorkLocations: IWorkLocationFE;
  isVerified: boolean;
  status: "active" | "inactive";
  basicSalary: number;
  bpjsKesehatan: boolean;
  bpjsKetenagakerjaan: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}
