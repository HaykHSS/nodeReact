export const generateRandomProducts = (count: number) => {
    const products = [];
    for (let i = 0; i < count; i++) {
      products.push({
        id: i,
        label: `Product ${i + 1}`,
        price: Math.floor(Math.random() * 100) + 1, // Random price between 1 and 100
        isInBasket: false
      });
    }
    return products;
  };