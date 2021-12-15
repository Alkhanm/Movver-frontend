import { iLocation } from "./iLocation";
export interface iAddress {
  readonly resultId: string,
  readonly title: string,
  readonly district: string,
  readonly city: string,
  readonly state: string,
  readonly distance: number, 
  readonly location: iLocation
}