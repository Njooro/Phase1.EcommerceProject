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

async function getProductsByCategory(category) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
}

async function displayProducts(category) {
  try {
    const products = await getProductsByCategory(category);
    const categoryBar = document.getElementById("products");
    categoryBar.innerHTML = "";

    products.forEach(product => {
      const productDiv = document.createElement("div");

      const title = document.createElement("h3");
      title.innerText = product.title;
      productDiv.appendChild(title);

      const price = document.createElement("p");
      price.innerText = `Price: $${product.price}`;
      productDiv.appendChild(price);

      const description = document.createElement("p");
      description.innerText = product.description;
      productDiv.appendChild(description);

      const image = document.createElement("img");
      image.src = product.image;
      image.style.width = '100px'; // Adjust image width as needed
      productDiv.appendChild(image);

      categoryBar.appendChild(productDiv);
    });
  } catch (error) {
    console.error(`Error displaying products in category ${category}:`, error);
  }
}

async function getCategories() {
  try {
    const products = await getAllProducts();
    const categories = [];
    const categoryBar = document.getElementById("categories");
    categoryBar.innerHTML = "";

    products.forEach(product => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });

    categories.forEach(category => {
      const span = document.createElement("span");
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      span.innerText = categoryName;
      span.style.cursor = "pointer";
      span.addEventListener('click', () => displayProducts(category));
      categoryBar.appendChild(span);

      const space = document.createElement("span");
      space.innerText = " ";
      categoryBar.appendChild(space);
    });

    return categories;
  } catch (error) {
    console.error('Error categorizing products:', error);
    return [];
  }
}


getCategories().then((categories) => {
  console.log(categories);
  
});
