import { Stack, Button, Heading, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import ProductList from "./components/ProductList";
import AddNewProductForm from "./components/AddNewProductForm";
import Notification from "./components/Notification";

let previousTimeout;

const selectValues = [
  { value: "cheapest", label: "Price: Low to High" },
  { value: "highest", label: "Price: High to Low" },
  { value: "az", label: "A to Z" },
  { value: "za", label: "Z to A" },
  { value: "most", label: "Most quantity" },
  { value: "least", label: "Least quantity" },
];

const App = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState("product-list");
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setAllProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, []);

  const sortProductByAlphabet = (a, b) => {
    return a.productName.toLowerCase() < b.productName.toLowerCase()
      ? -1
      : a.productName.toLowerCase() > b.productName.toLowerCase()
      ? 1
      : 0;
  };

  const selectOptionHandler = (event) => {
    setSelectedOption(event.currentTarget.value);
    switch (event.currentTarget.value) {
      case "cheapest":
        setAllProducts(allProducts.sort((a, b) => a.price - b.price));
        break;

      case "highest":
        setAllProducts(allProducts.sort((a, b) => b.price - a.price));
        break;
      case "az":
        setAllProducts(allProducts.sort(sortProductByAlphabet));
        break;
      case "za":
        setAllProducts(allProducts.sort(sortProductByAlphabet).reverse());
        break;

      case "least":
        setAllProducts(allProducts.sort((a, b) => a.quantity - b.quantity));
        break;

      case "most":
        setAllProducts(allProducts.sort((a, b) => b.quantity - a.quantity));
        break;

      default:
        return;
    }
  };

  const displayMessage = (message) => {
    clearTimeout(previousTimeout);
    previousTimeout = setTimeout(() => {
      setMessage(null);
    }, 5000);
    setMessage(message);
  };

  return (
    <div>
      <Heading color="teal" textAlign="center" mt={4}>
        MY STORAGE
      </Heading>

      <Notification message={message} />

      <Stack direction="row" spacing={4} align="center" mt={4} ml={10}>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => setCurrentPage("product-list")}
          p={2}
        >
          Product List
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => setCurrentPage("add-product-form")}
          p={2}
        >
          Add Product Form
        </Button>
        <Select
          placeholder="Sort products"
          p={2}
          width="30%"
          borderColor="teal"
          variant="outline"
          value={selectedOption}
          onChange={selectOptionHandler}
        >
          {selectValues.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </Stack>

      <ProductList
        show={currentPage === "product-list"}
        allProducts={allProducts}
        displayMessage={displayMessage}
      />

      <AddNewProductForm
        show={currentPage === "add-product-form"}
        setAllProducts={setAllProducts}
        allProducts={allProducts}
        displayMessage={displayMessage}
      />
    </div>
  );
};

export default App;
