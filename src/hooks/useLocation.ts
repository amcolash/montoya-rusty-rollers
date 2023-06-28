import { useEffect, useState } from 'react';

export function useLocation() {
  const [hash, setLocation] = useState(window.location.hash);
  const [adminMode, setAdminMode] = useState(window.location.hash.includes('/admin'));

  useEffect(() => {
    const handler = () => setLocation(window.location.hash);
    window.addEventListener('hashchange', handler);

    return () => window.removeEventListener('hashchange', handler);
  }, []);

  useEffect(() => {
    setAdminMode(hash.includes('/admin'));
  }, [hash, setAdminMode]);

  return { hash, adminMode };
}
