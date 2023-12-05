export const arraySplitter = (array, sizes) => {
  const splitted = [];
  const splitTimes = Math.ceil(array.length / sizes);
  const arrayCopy = [...array];

  for (let index = 0; index < splitTimes; index++) {
    splitted.push(arrayCopy.splice(0, sizes));
  }

  return splitted;
};
