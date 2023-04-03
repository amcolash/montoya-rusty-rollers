// Set css variables
export function createVariables() {
  createVariable('--background', '#333');
  createVariable('--primary', '#eee');
  createVariable('--secondary', '#999');
  createVariable('--warning', '#e3bd24');
}

function createVariable(name: string, value: string) {
  document.documentElement.style.setProperty(name, value);
}
