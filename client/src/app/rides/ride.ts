import {User} from "../users/user";

export interface Ride {
  _id: string;
  driver: User;
  notes: string;
  seatsAvailable: number;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
}
