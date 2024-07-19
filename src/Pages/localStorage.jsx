let categories = [];

const getStores = () => {
    try {
      const stores = JSON.parse(localStorage.getItem('stores')) || [];
      return stores;
    } catch (error) {
      console.error('Error retrieving stores from localStorage:', error);
      return [];
    }
  };
  
const loadCategoriesFromLocalStorage = () => {
  try {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    categories = storedCategories;
  } catch (error) {
    console.error('Error retrieving categories from localStorage:', error);
    categories = [];
  }
};

const getCategories = () => {
  loadCategoriesFromLocalStorage();
  return categories;
};


export {
  getStores,
  getCategories,
};
