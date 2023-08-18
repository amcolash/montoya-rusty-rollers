/**
 * Converts a string path to a value that is existing in a json object.
 *
 * From: https://stackoverflow.com/a/34797931/2303432
 *
 * @param {object} jsonData Json data to use for searching the value.
 * @param {string} path the path to use to find the value.
 * @returns {valueOfThePath|null}
 */
export function jsonPathToValue(jsonData: object, path: string) {
  if (!(jsonData instanceof Object) || typeof path === 'undefined') {
    throw 'Not valid argument:jsonData:' + jsonData + ', path:' + path;
  }
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  const pathArray = path.split('.');
  for (let i = 0, n = pathArray.length; i < n; ++i) {
    const key = pathArray[i];
    if (key in jsonData) {
      if (jsonData[key] !== null) {
        jsonData = jsonData[key];
      } else {
        return null;
      }
    } else {
      return key;
    }
  }
  return jsonData;
}
