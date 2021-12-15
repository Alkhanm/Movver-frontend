export interface iClient {
  readonly name: string;
  readonly phoneNumber: string;
  readonly birthdate: number;
  readonly password: string;
  readonly id?: string;
}