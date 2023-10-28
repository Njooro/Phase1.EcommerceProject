

// Function to get all products
async function getAllProducts() {
  try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      return products;
  } catch (error) {
      console.error('Error fetching products:', error);
      return [];
  }
}

// Function to categorize products into different categories
async function getCategories() {
  try {
      const products = await getAllProducts();
      const categories = {};

      for (const product of products) {
          if (product.category in categories) {
              categories[product.category].push(product);
          } else {
              categories[product.category] = [product];
          }
      }

      return categories;
  } catch (error) {
      console.error('Error categorizing products:', error);
      return {};
  }
}


getCategories()
  .then((categories) => {
      console.log(categories);
      
  });
