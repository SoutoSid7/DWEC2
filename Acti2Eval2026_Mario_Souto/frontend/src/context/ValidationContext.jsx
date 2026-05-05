import { createContext } from "react";

export const ValidationContext = createContext({
  regexIdPoliza: /^ID\d{5}$/,
  regexMatricula: /^[0-9]{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/,
});
