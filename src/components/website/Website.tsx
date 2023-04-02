import React, { useEffect } from 'react';
import { loadingList } from '../../hooks/useDb';
import { EditableImage, ImageId } from './EditableImage';
import { EditableText, TextId } from './EditableText';
import { Nav } from './Nav';

export function Website() {
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    let timer = setInterval(() => {
      if (loadingList.length === 0) {
        setLoaded(true);
        clearInterval(timer);
      }
    }, 100);
  }, []);

  return (
    <>
      <div style={{ display: loaded ? 'none' : undefined }}>Loading...</div>

      <div style={{ display: loaded ? undefined : 'none' }}>
        <Nav />

        <EditableText id={TextId.header} />
        <EditableText id={TextId.intro} />
        <EditableText id={TextId.main} />
        <EditableText id={TextId.footer} />

        <EditableImage id={ImageId.header} style={{ width: '50%', height: '20vh' }} />
      </div>
    </>
  );
}
