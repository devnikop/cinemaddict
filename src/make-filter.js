export const filterRender = (filterName, filmCount = 0) => {
  return `
    <a href="#${filterName}" class="main-navigation__item">${filterName}
      ${filmCount === 0 ? `` : `<span class="main-navigation__item-count">${filmCount}</span>`}
    </a>
  `;
};
