const Rank = {
  'NOVICE': {
    'MIN': 1,
    'MAX': 10,
  },
  'FAN': {
    'MIN': 11,
    'MAX': 20,
  },
  'MOVIE BUFF': {
    'MIN': 21,
  }
};

export const createElement = (template) => {
  const container = document.createElement(`div`);
  container.insertAdjacentHTML(`afterbegin`, template);
  return container.firstChild;
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

export const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

export const setUserRank = (filmCardDataList) => {
  let watchedCount = 0;
  for (const currentFilmCardData of filmCardDataList) {
    watchedCount += currentFilmCardData.isWatched ? 1 : 0;
  }

  let userRank = ``;
  if (watchedCount >= Rank[`NOVICE`][`MIN`] && watchedCount <= Rank[`NOVICE`][`MAX`]) {
    userRank = `novice`;
  } else if (watchedCount >= Rank[`FAN`][`MIN`] && watchedCount <= Rank[`FAN`][`MAX`]) {
    userRank = `fan`;
  } else if (watchedCount >= Rank[`MOVIE BUFF`][`MIN`]) {
    userRank = `movie buff`;
  }
  return userRank;
};
