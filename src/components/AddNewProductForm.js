import { useState } from "react";
import {
  Input,
  Wrap,
  WrapItem,
  Button,
  Spacer,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";

function NewProductForm({ show, allProducts, displayMessage, setAllProducts }) {
  const [newProduct, setNewProduct] = useState({
    productName: "",
    price: "",
    brand: "",
    unit: "",
    category: "",
    quantity: "",
  });

  if (!show) {
    return null;
  }

  const hasProductNameExisted = allProducts.find(
    (item) => item.productName === newProduct.productName
  );

  const addProduct = async (event) => {
    event.preventDefault();

    if (hasProductNameExisted) {
      displayMessage("Product name is already existed");

      return;
    }

    const productAdded = {
      id: Date.now(),
      productName: newProduct.productName,
      quantity: newProduct.quantity,
      price: newProduct.price,
      category: newProduct.category,
      brand: newProduct.brand,
      unit: newProduct.unit,
    };

    try {
      await axios.post("http://localhost:3001/products", productAdded);

      setAllProducts(allProducts.concat(productAdded));

      displayMessage(`Product ${newProduct.productName} is added successfully`);

      setNewProduct({
        productName: "",
        price: "",
        brand: "",
        unit: "",
        category: "",
        quantity: "",
      });
    } catch (error) {
      displayMessage(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={addProduct}>
        <Wrap w="100%" mt={5}>
          <FormControl w="80%" d="flex" alignItems="center" isRequired>
            <FormLabel w="30%" textAlign="center">
              Product Name
            </FormLabel>
            <Wrap
              m={1}
              width="100%"
              data-testid="test-product-name-input-wrapper"
            >
              <Input
                type="string"
                isInvalid={hasProductNameExisted ? true : false}
                errorBorderColor="crimson"
                value={newProduct.productName}
                onChange={({ target }) =>
                  setNewProduct({ ...newProduct, productName: target.value })
                }
                placeholder="Product Name"
                data-testid="test-product-name-input"
              />
              {hasProductNameExisted && (
                <FormHelperText color="red" fontSize="xs">
                  Product name is already existed!
                </FormHelperText>
              )}
            </Wrap>
          </FormControl>

          <FormControl w="80%" d="flex" alignItems="center" isRequired>
            <FormLabel w="30%" textAlign="center">
              Price
            </FormLabel>
            <Input
              type="number"
              value={newProduct.price}
              onChange={({ target }) =>
                setNewProduct({ ...newProduct, price: target.value })
              }
              placeholder="Price"
              data-testid="test-price-input"
            />
          </FormControl>

          <FormControl w="80%" d="flex" alignItems="center" isRequired>
            <FormLabel w="30%" textAlign="center">
              Quantity
            </FormLabel>
            <Input
              type="number"
              value={newProduct.quantity}
              onChange={({ target }) =>
                setNewProduct({ ...newProduct, quantity: target.value })
              }
              placeholder="Quantity"
              data-testid="test-quantity-input"
            />
          </FormControl>

          <FormControl w="80%" d="flex" alignItems="center" isRequired>
            <FormLabel w="30%" textAlign="center">
              Brand
            </FormLabel>
            <Input
              type="string"
              value={newProduct.brand}
              onChange={({ target }) =>
                setNewProduct({ ...newProduct, brand: target.value })
              }
              placeholder="Brand"
              data-testid="test-brand-input"
            />
          </FormControl>

          <FormControl w="80%" d="flex" alignItems="center" isRequired>
            <FormLabel w="30%" textAlign="center">
              Category
            </FormLabel>
            <Input
              type="string"
              value={newProduct.category}
              onChange={({ target }) =>
                setNewProduct({ ...newProduct, category: target.value })
              }
              placeholder="Category"
              data-testid="test-category-input"
            />
          </FormControl>

          <FormControl w="80%" d="flex" alignItems="center" isRequired>
            <FormLabel w="30%" textAlign="center">
              Unit
            </FormLabel>
            <Input
              type="string"
              value={newProduct.unit}
              onChange={({ target }) =>
                setNewProduct({ ...newProduct, unit: target.value })
              }
              placeholder="Unit"
              data-testid="test-unit-input"
            />
          </FormControl>

          <WrapItem w="80%" d="flex" alignItems="center">
            <Spacer />
            <Button
              type="submit"
              colorScheme="teal"
              variant="solid"
              borderRadius="full"
              mt={10}
              data-testid="test-add-button"
            >
              Add Product
            </Button>
          </WrapItem>
        </Wrap>
      </form>
    </>
  );
}

export default NewProductForm;
