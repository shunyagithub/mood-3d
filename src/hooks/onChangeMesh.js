export const onChangeMesh = (idx, set) => {
  let number = idx;
  number += 1;

  if (number === 4) {
    number = 0;
  }
  set(number);
};
