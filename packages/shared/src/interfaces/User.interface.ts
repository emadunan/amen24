import { AuthProvider } from "../enums";
import { Profile } from "./Profile.interface";

export interface User {
  id: string;
  email: string;
  password: string;
  displayName: string;
  provider: AuthProvider;
  providerId: string;
  profile: Profile;
  photoUri: string;
  isActive: boolean;
  isVerified: boolean;
  failedAttempts: number;
  lockUntil: Date | null;
}
