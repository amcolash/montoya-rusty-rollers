import React, { useEffect, useState } from 'react';
import { loadingList } from '../../hooks/useDb';
import { Footer } from './Footer';
import { Loader } from './Loader';
import { Nav } from './Nav';
import { About } from './sections/About';
import { Banner } from './sections/Banner';
import { Contact } from './sections/Contact';
import { Services } from './sections/Services';
import { Work } from './sections/Work';

export function Website() {
  const [loaded, setLoaded] = useState(false);
  const [loaderRemoved, setLoaderRemoved] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (loadingList.length === 0) {
        clearInterval(timer);

        document.body.scrollTop = 0;
        setTimeout(() => setLoaded(true), 250);

        setTimeout(() => {
          setLoaderRemoved(true);
        }, 1000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {!loaderRemoved && (
        <Loader style={{ opacity: loaded ? 0 : 1, transition: 'opacity 0.5s', pointerEvents: loaded ? 'none' : undefined }} />
      )}

      <Nav />

      <Banner />
      <Services />
      <Work />
      <About />
      <Contact />

      <Footer />
    </>
  );
}
