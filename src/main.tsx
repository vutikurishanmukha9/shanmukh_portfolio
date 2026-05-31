import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// White-labeling helper to actively trace and purge any platform overlays, badges, or loaders (Lovable, GPT Engineer)
const purgePlatformElements = () => {
  const selectors = [
    'gptengineer-brand',
    'gptengineer-brand-container',
    '#gpt-engineer-brand',
    '.gpt-engineer-brand',
    '#lovable-badge',
    '.lovable-badge',
    '#lovable-loading-overlay',
    '.lovable-loading-overlay',
    '[id*="lovable"]',
    '[class*="lovable"]',
    '[id*="gpt-engineer"]',
    '[id*="gptengineer"]',
    '[class*="gptengineer"]',
    '[class*="gpt-engineer"]'
  ];

  selectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    } catch (e) {
      // Ignore errors for invalid selectors
    }
  });
};

// Execute purge immediately
purgePlatformElements();

// Monitor DOM changes to suppress dynamically loaded badges or components during runtime
if (typeof window !== 'undefined' && typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver((mutations) => {
    let shouldPurge = false;
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        shouldPurge = true;
        break;
      }
    }
    if (shouldPurge) {
      purgePlatformElements();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}

createRoot(document.getElementById("root")!).render(<App />);
