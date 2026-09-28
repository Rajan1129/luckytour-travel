import { createContext, useContext, useState, useCallback } from 'react';

const Ctx = createContext(null);
export function EnquiryProvider({ children }) {
  const [state, setState] = useState({ open: false, preset: {} });
  const open = useCallback((preset = {}) => setState({ open: true, preset }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  return <Ctx.Provider value={{ ...state, openEnquiry: open, closeEnquiry: close }}>{children}</Ctx.Provider>;
}
export const useEnquiry = () => useContext(Ctx);
