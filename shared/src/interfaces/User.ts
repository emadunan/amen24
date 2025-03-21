import { AuthProvider } from "../@types";
import { Profile } from "./Profile";

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
