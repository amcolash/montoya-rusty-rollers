const loading = document.getElementById('loading');
loading.style.display = 'none';

const root = document.getElementById('root');
root.innerHTML =
  '<h1>Sorry, your internet browser is not supported by this page, or is not up to date.</h1>' +
  '<h2>Please try a supported browser, such as ' +
  '<a href="https://www.google.com/chrome/">Chrome</a>, ' +
  '<a href="https://www.mozilla.org/en-US/firefox/">Firefox</a>, ' +
  '<a href="https://www.microsoft.com/en-us/edge">Edge</a>, ' +
  'or <a href="https://www.apple.com/safari/">Safari</a>.' +
  '</h2>';
