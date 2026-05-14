import { IUser } from "../auth/types";

export interface CreateActivityBody {
  title?: string;
  lat: string;
  lng: string;
  address?: string;

  documentation: {
    photo: {
      url: string;
      publicId: string;
    };
    caption: string;
  }[];
}

interface ActivityDocumentation {
  photo: {
    url: string;
    publicId: string;
  };
  caption: string;
}

/**
 * 🔥 MAIN INTERFACE
 */
export interface IActivity {
  _id: string;

  user: IUser;

  title: string;

  documentation: ActivityDocumentation[];

  /**
   * 🔥 GEOJSON (biar konsisten sama Report & WorkLocation)
   */
  location: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };

  address?: string;

  activityTime: string;

  /**
   * 🔥 future-proof
   */
  metadata?: {
    source?: "mobile" | "web";
  };

  createdAt?: Date;
  updatedAt?: string;
}
