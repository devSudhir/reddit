const loadData = (key) => {
  try {
    let data = JSON.parse(localStorage.getItem(key));
    return data;
  } catch (err) {
    return undefined;
  }
};

const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export { loadData, saveData };
