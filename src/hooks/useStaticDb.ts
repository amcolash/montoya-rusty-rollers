import { jsonPathToValue } from '../util/getJsonValue';
import { loadingList } from './useDb';

console.log('Loaded static db');

const url = 'https://montoya-rusty-rollers-default-rtdb.firebaseio.com/';
const loadingKey = 'staticDb';

let data: object;

export function updateData() {
  if (loadingList.includes(loadingKey)) return;

  loadingList.push(loadingKey);
  fetch(url + '.json')
    .then((res) => res.json())
    .then((json) => {
      data = json;
      loadingList.splice(loadingList.indexOf(loadingKey), 1);
    });
}

export function useStaticDb<T>(
  ref: string
): [T | undefined, boolean, Error | undefined, (val: T) => Promise<void>, boolean] {
  const path = ref.replace(/\//g, '.');
  const value = data !== undefined ? (jsonPathToValue(data, path) as T) : undefined;

  return [value, false, undefined, async () => {}, false];
}
