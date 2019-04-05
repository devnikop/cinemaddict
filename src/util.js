export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createElement = (template) => {
  const container = document.createElement(`div`);
  container.insertAdjacentHTML(`afterbegin`, template);
  return container.firstChild;
};

export const removeAll = (elements) => {
  for (const value of elements) {
    value.remove();
  }
};

export const clearContainer = (container, selector) => {
  removeAll(container.querySelectorAll(selector));
};

export const addNodeListInContainer = (nodeList, container) => {
  const fragment = document.createDocumentFragment();
  for (const node of nodeList) {
    fragment.appendChild(node);
  }
  container.appendChild(fragment);
};

export const compare = (key) => {
  return (a, b) => {
    if (a[key] > b[key]) {
      return -1;
    } else if (a[key] < b[key]) {
      return 1;
    } else {
      return 0;
    }
  };
};
