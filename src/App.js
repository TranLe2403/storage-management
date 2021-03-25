import { Stack, Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import AddNewProductForm from "./components/AddNewProductForm";
import Notification from "./components/Notification";
import axios from "axios";

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
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
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
