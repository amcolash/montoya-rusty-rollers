import React, { createContext, useEffect, useState } from 'react';

import { loadingList, useDbLoader } from '../../hooks/useDb';
import { lightboxLoading } from '../../util/globalState';
import ScrollToHashElement from '../ScrollToHashElement';
import { Footer } from './Footer';
import { Loader } from './Loader';
import { Nav } from './Nav';
import { About } from './sections/About';
import { Banner } from './sections/Banner';
import { Contact } from './sections/Contact';
import { Services } from './sections/Services';
import { Work } from './sections/Work';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DBContext = createContext<any>(undefined);

export function Website() {
  const [loaded, setLoaded] = useState(false);
  const [loaderRemoved, setLoaderRemoved] = useState(false);
  const [lightbox, setLightbox] = lightboxLoading.use();

  const dbFn = useDbLoader();

  useEffect(() => {
    const timer = setInterval(() => {
      if (loadingList.length === 0) {
        clearInterval(timer);

        document.body.scrollTop = 0;
        setTimeout(() => setLoaded(true), 150);

        setTimeout(() => {
          setLoaderRemoved(true);
        }, 1000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const loaderVisible = !loaderRemoved || lightbox;
  const loaderFading = loaded && !lightbox;

  return (
    <>
      {loaderVisible && (
        <Loader
          style={{
            opacity: loaderFading ? 0 : 1,
            transition: 'opacity 0.5s',
            pointerEvents: loaderFading ? 'none' : undefined,
          }}
        />
      )}

      {loaded && (
        <DBContext.Provider value={dbFn}>
          <ScrollToHashElement />
          <Nav />

          <Banner />
          <Services />
          <Work />
          <About />
          <Contact />

          <Footer />
        </DBContext.Provider>
      )}
    </>
  );
}
