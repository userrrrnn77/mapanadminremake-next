import { IWorkLocationFE } from "../workLocation/types";

export interface RegisterBody {
  username: string;
  password: string;
  fullname: string;
  phone: string;
  role?: string;
  locationCode: string;
}

export interface UpdateMeBody {
  username?: string;
  password?: string;
  profilePhoto?: {
    url: string;
    publicId: string;
  };
}

export const USER_ROLES = [
  "admin",
  "security",
  "cleaning_service",
  "customer_service",
  "gardener",
  "street",
] as const;

export const SHIFTS = ["pagi", "siang", "malam"] as const;

type Role = (typeof USER_ROLES)[number];
type Shift = (typeof SHIFTS)[number];

/**
 * 🔥 INTERFACE
 */
export interface IUser extends Document {
  username: string;
  password: string;
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

  comparePassword(password: string): Promise<boolean>;
}

export interface LoginBody {
  phone: string;
  password: string;
}
