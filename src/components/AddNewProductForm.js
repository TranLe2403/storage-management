import productData from "../products.json";
import { useState } from "react";

function NewProductForm(props) {
  const [newProduct, setNewProduct] = useState({
    productName: "",
    price: 0,
    brand: "",
    unit: "",
    category: "",
    quantity: 0,
  });

  const [currentProducts, setCurrentProduct] = useState(productData.products);
  if (!props.show) {
    return null;
  }
  const addProduct = (event) => {
    event.preventDefault();

    const productAdded = {
      id: Date.now(),
      productName: newProduct.productName,
      quantity: newProduct.quantity,
      price: newProduct.price,
      category: newProduct.category,
      brand: newProduct.brand,
      unit: newProduct.unit,
    };

    console.log("prpductAdded: ", productAdded);
    setCurrentProduct(currentProducts.concat(productAdded));

    setNewProduct({
      productName: "",
      price: 0,
      brand: "",
      unit: "",
      category: "",
      quantity: 0,
    });
  };

  return (
    <div>
        Hello from Add product form
    </div>
  );
}

export default NewProductForm;
