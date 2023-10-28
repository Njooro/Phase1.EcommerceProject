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

// ... your existing JavaScript code ...

async function displayProducts(category) {
  try {
    const products = await getProductsByCategory(category);
    const categoryBar = document.getElementById("products");
    categoryBar.innerHTML = "";

    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const image = document.createElement("img");
      image.classList.add("product-image");
      image.src = product.image;
      productCard.appendChild(image);

      const title = document.createElement("h3");
      title.classList.add("product-title");
      title.innerText = product.title;
      productCard.appendChild(title);

      const price = document.createElement("p");
      price.classList.add("product-price");
      price.innerText = `Price: $${product.price}`;
      productCard.appendChild(price);

      const description = document.createElement("p");
      description.classList.add("product-description");
      description.innerText = product.description;
      productCard.appendChild(description);

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");

      const purchaseButton = document.createElement("button");
      purchaseButton.classList.add("action-button");
      purchaseButton.innerText = "Purchase";
      // Add purchase button functionality here

      const likeButton = document.createElement("button");
      likeButton.classList.add("action-button");
      likeButton.innerText = "Like";
      // Add like button functionality here

      const cartButton = document.createElement("button");
      cartButton.classList.add("action-button");
      cartButton.innerText = "Add to Cart";
      // Add cart button functionality here

      buttonContainer.appendChild(purchaseButton);
      buttonContainer.appendChild(likeButton);
      buttonContainer.appendChild(cartButton);

      productCard.appendChild(buttonContainer);

      categoryBar.appendChild(productCard);
    });
  } catch (error) {
    console.error(`Error displaying products in category ${category}:`, error);
  }
}

// ... your existing JavaScript code ...


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
