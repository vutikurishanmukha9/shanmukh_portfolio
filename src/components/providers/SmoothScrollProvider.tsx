import React, { createContext, useContext } from 'react';

interface SmoothScrollContextType {
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollTo: () => {},
});

export const useLenis = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollTo = React.useCallback((target: string | HTMLElement, offset: number = -80) => {
    const element = target instanceof HTMLElement ? target : document.querySelector(target);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const value = React.useMemo(() => ({ scrollTo }), [scrollTo]);

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
