// Based on https://constantsolutions.dk/2020/06/delay-loading-of-google-analytics-google-tag-manager-script-for-better-pagespeed-score-and-initial-load/

let gtmDidInit = false;

document.addEventListener('DOMContentLoaded', () => setTimeout(initGTM, 5000));

document.addEventListener('scroll', initGTMOnEvent);
document.addEventListener('mousemove', initGTMOnEvent);
document.addEventListener('touchstart', initGTMOnEvent);

function initGTMOnEvent(event: Event) {
  initGTM();
  event.currentTarget?.removeEventListener(event.type, initGTMOnEvent); // remove the event listener that got triggered
}

function initGTM() {
  if (gtmDidInit) {
    return false;
  }

  gtmDidInit = true; // flag to ensure script does not get added to DOM more than once.
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;

  // ensure PageViews is always tracked (on script load)
  script.onload = () => {
    window.dataLayer.push({ event: 'gtm.js', 'gtm.start': new Date().getTime(), 'gtm.uniqueEventId': 0 });
  };
  script.src = 'https://www.googletagmanager.com/gtm.js?id=G-RWS22TKSLG';
  document.head.appendChild(script);
}
