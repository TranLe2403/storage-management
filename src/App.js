import { Stack, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import ProductList from "./components/ProductList";
import AddNewProductForm from "./components/AddNewProductForm";
import productData from "./products.json";
import Notification from "./components/Notification";

function App() {
  const [allProducts, setAllProducts] = useState(productData.products);
  const [currentPage, setCurrentPage] = useState("product-list");
  const [message, setMessage] = useState("");

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
