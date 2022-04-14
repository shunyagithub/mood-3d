export const onChangeMesh = (idx, set) => {
  let number = idx;
  number += Math.floor(Math.random() * 4); //random number

  if (number > 3) {
    number = 0;
  }

  set(number);
};
