export const getSavedBrewIds = () => {
    const savedBrewIds = localStorage.getItem('saved_brews')
        ? JSON.parse(localStorage.getItem('saved_brews'))
        : [];

    return savedBrewIds;
};
  
export const saveBrewIds = (brewIdArr) => {
    if (brewIdArr.length) {
        localStorage.setItem('saved_brews', JSON.stringify(brewIdArr));
    } else {
        localStorage.removeItem('saved_brews');
    }
};
  
export const removeBrewId = (brewId) => {
    const savedBrewIds = localStorage.getItem('saved_brews')
        ? JSON.parse(localStorage.getItem('saved_brews'))
        : null;

    if (!savedBrewIds) {
        return false;
    }
  
    const updatedSavedBrewIds = savedBrewIds?.filter((savedBrewId) => savedBrewId !== brewId);
    localStorage.setItem('saved_brews', JSON.stringify(updatedSavedBrewIds));
  
    return true;
};