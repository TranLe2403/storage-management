import { Stack, Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import ProductList from "./components/ProductList";
import AddNewProductForm from "./components/AddNewProductForm";
import Notification from "./components/Notification";

let previousTimeout;

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState("product-list");
  const [message, setMessage] = useState("");

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

  const displayMessage = (message) => {
    clearTimeout(previousTimeout);
    previousTimeout = setTimeout(() => {
      setMessage(null);
    }, 5000);
    setMessage(message);
  };

  return (
    <div className="App">
      <Heading color="teal" textAlign="center" mt={4}>
        MY STORAGE
      </Heading>

      <Notification message={message} />

      <Stack direction="row" spacing={4} align="center" mt={4} ml={10}>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => setCurrentPage("product-list")}
        >
          Product List
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => setCurrentPage("add-product-form")}
        >
          Add Product Form
        </Button>
      </Stack>

      <ProductList
        show={currentPage === "product-list"}
        allProducts={allProducts}
        displayMessage={displayMessage}
        setAllProducts={setAllProducts}
      />

      <AddNewProductForm
        show={currentPage === "add-product-form"}
        setAllProducts={setAllProducts}
        allProducts={allProducts}
        displayMessage={displayMessage}
      />
    </div>
  );
}

export default App;
