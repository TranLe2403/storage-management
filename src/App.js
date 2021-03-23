import { Stack, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import ProductList from "./components/ProductList";
import AddNewProductForm from "./components/AddNewProductForm";

function App() {
  const [currentPage, setCurrentPage] = useState("product-list");

  return (
    <div className="App">
      <Heading color="teal" textAlign="center" marginTop={4}>
        MY STORAGE
      </Heading>

      <Stack
        direction="row"
        spacing={4}
        align="center"
        marginTop={4}
        marginLeft={10}
      >
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

      <ProductList show={currentPage === "product-list"} />

      <AddNewProductForm show={currentPage === "add-product-form"} />
    </div>
  );
}

export default App;
