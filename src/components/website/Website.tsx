import React, { useEffect } from 'react';
import { style } from 'typestyle';
import { loadingList } from '../../hooks/useDb';
import { headerHeight } from '../../util/globalState';
import { EditableImage, ImageId } from './EditableImage';
import { EditableText, TextId } from './EditableText';
import { Nav } from './Nav';
import { Page } from './Page';

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

  const height = headerHeight.useValue();
  const pageStyle = style({ height: `calc(100vh - ${height}px)` });

  return (
    <>
      <div style={{ display: loaded ? 'none' : undefined }}>Loading...</div>

      <div style={{ display: loaded ? undefined : 'none' }}>
        <Nav />

        <Page className={pageStyle} style={{ background: 'hsl(0, 30%, 65%)' }}>
          <EditableText id={TextId.header} />
          <EditableText id={TextId.intro} />
          <EditableText id={TextId.main} />
          <EditableText id={TextId.footer} />

          <EditableImage id={ImageId.header} style={{ width: '50%', height: '20vh' }} />
        </Page>
        <Page className={pageStyle} style={{ background: 'hsl(80, 30%, 65%)' }}></Page>
        <Page className={pageStyle} style={{ background: 'hsl(240, 30%, 65%)' }}></Page>
        <Page className={pageStyle} style={{ background: 'hsl(160, 30%, 65%)' }}></Page>
        <Page className={pageStyle} style={{ background: 'hsl(320, 30%, 65%)' }}></Page>
      </div>
    </>
  );
}
