import { IUser } from "../auth/types";

export interface IReportFE {
  _id?: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  photos: string[]; // URL Cloudinary hasil upload tadi
  source?: "mobile" | "web" | "system";
  priority?: "low" | "medium" | "high";
  status?: "open" | "in_progress" | "resolved" | "rejected";
  createdAt?: string;
}

export interface GetReportsResponse {
  success: boolean;
  data: IReportFE[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export const REPORT_STATUS = [
  "open",
  "in_progress",
  "resolved",
  "rejected",
] as const;

export const REPORT_PRIORITY = ["low", "medium", "high"] as const;

export type ReportStatus = (typeof REPORT_STATUS)[number];
export type ReportPriority = (typeof REPORT_PRIORITY)[number];

/**
 * 🔥 INTERFACE
 */
export interface IReport {
  _id: string;
  user: IUser;

  description: string;

  photos: string[];

  /**
   * 🔥 GEOJSON (biar bisa map + radius query)
   */
  location?: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };

  address?: string;

  reportTime: string;

  status: ReportStatus;

  /**
   * 🔥 optional future fields
   */
  metadata?: {
    source?: "mobile" | "web" | "system";
    priority?: "low" | "medium" | "high";
  };

  resolvedAt?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReportBody {
  description: string;
  lat: number;
  lng: number;
  address?: string;
  photos: string[]; // URL Cloudinary
  priority?: ReportPriority;
}
