import { createContext, useContext } from 'react';

const validationValues = {
  regexIdPoliza: /^ID\d{5}$/,
  regexMatricula: /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/,
  transmisiones: ['Automática', 'Manual'],
  combustibles: ['Combustión', 'Eléctrico']
};

const ValidationContext = createContext(validationValues);
export const ValidationProvider = ({ children }) => <ValidationContext.Provider value={validationValues}>{children}</ValidationContext.Provider>;
export const useValidation = () => useContext(ValidationContext);
