/* eslint-disable @typescript-eslint/no-explicit-any */

export const convertObjToRequestParams = (obj: any) => {
  const objectValues: string[] | any[] = Object.values(obj);
  const objectKeys: string[] = Object.keys(obj);

  const string: string[] = [];

  const filteredObj = objectValues.filter((e) => e !== null);

  if (filteredObj.length > 0) {
    string.push('?');
  }

  objectKeys.forEach((key, index: number) => {
    if (objectValues[index] !== null) {
      string.push(key);
      string.push('=');

      if (Array.isArray(objectValues[index])) {
        string.push(JSON.stringify(objectValues[index]));
        if (index < objectKeys.length - 1) {
          string.push('&');
        }
        return;
      }
      if (
        typeof objectValues[index] === 'string' ||
        new Date(objectKeys[index])
      ) {
        string.push(objectValues[index] as string);
        if (index < objectKeys.length - 1) {
          string.push('&');
        }
        return;
      }
    }
  });

  return string.join('');
};
