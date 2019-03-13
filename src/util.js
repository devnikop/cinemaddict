export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createElement = (template) => {
  const container = document.createElement(`div`);
  container.insertAdjacentHTML(`afterbegin`, template);
  return container.firstChild;
};
