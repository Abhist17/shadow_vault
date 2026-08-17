import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently nearest the top of the viewport.
 *
 * IntersectionObserver rather than a scroll listener: the browser does the
 * hit-testing off the main thread, so navigating a long page stays smooth.
 */
export function useScrollSpy(ids, offset = "-45% 0px -50% 0px") {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: offset, threshold: 0 },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
