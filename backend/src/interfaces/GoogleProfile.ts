import { Profile } from 'passport-google-oauth20';

export interface GoogleProfile extends Profile {
  id: string;
  displayName: string;
  name?: {
    familyName: string;
    givenName: string;
  };
  emails?: { value: string; verified: boolean }[];
  photos?: { value: string }[];
  provider: 'google';
  _json: {
    iss: string;
    azp?: string;
    aud: string;
    sub: string;
    at_hash?: string;
    iat: number;
    exp: number;
    email?: string;
    email_verified?: boolean;
    given_name?: string;
    family_name?: string;
    name: string;
    picture: string;
    locale: string;
  };
}
