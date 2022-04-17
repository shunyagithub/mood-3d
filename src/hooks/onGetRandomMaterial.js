const colors = ['blue', 'orange', 'green', 'yellow', 'pink'];

export const onGetRandomMaterial = (materials) => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return materials[color].name;
};
