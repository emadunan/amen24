import { Profile } from "./Profile";

export interface User {
  id: string;
  password: string;
  provider: string;
  providerId: string;
  profile: Profile;
  email: string;
  displayName: string;
  photoUri: string;
  isActive: boolean;
}
