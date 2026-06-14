import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the window
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Also scroll the document element and body just in case
    document.documentElement.scrollTo({ top: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, behavior: 'instant' });

    // Handle any potential scroll containers in the layout
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'instant' });
    }

    // A small timeout helps if the page content is still rendering
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
