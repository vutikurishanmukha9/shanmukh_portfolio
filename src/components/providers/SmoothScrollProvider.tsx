import React, { createContext, useContext } from 'react';

interface SmoothScrollContextType {
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollTo: () => {},
});

export const useLenis = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollTo = (target: string | HTMLElement, offset: number = -80) => {
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset + offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else if (target instanceof HTMLElement) {
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
