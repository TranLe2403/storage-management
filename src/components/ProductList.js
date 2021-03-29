import { useState, useEffect } from "react";
import { Box, Grid, Image, Text, Stack } from "@chakra-ui/react";

import ModalProductDeletion from "./ModalProductDeletion";
import defaultImg from "../images/default.png";
import ModalProductEdition from "./ModalProductEdition";

function ProductList({ show, allProducts, setAllProducts, displayMessage }) {
  const getNumberOfItems = () => {
    const screenSize = window.innerWidth;

    if (screenSize > 1280) {
      return 3;
    } else if (screenSize < 1280 && screenSize >= 768) {
      return 2;
    }
    return 1;
  };

  const [limitLength, setLimitLength] = useState(getNumberOfItems());

  useEffect(() => {
    window.addEventListener("resize", reportWindowSize);
    return () => {
      window.removeEventListener("resize", reportWindowSize);
    };
  });

  function reportWindowSize() {
    setLimitLength(getNumberOfItems());
  }

  if (!show) {
    return null;
  }

  return (
    <Grid
      templateColumns={`repeat(${limitLength}, 1fr)`}
      gap={10}
      ml={10}
      mr={10}
      data-testid="test-all-products"
    >
      {allProducts.map((item, index) => (
        <Box
          key={item.id}
          bg="tomato"
          w="100%"
          color="white"
          m="30px auto"
          p="30px"
          borderRadius="lg"
          boxShadow="2xl"
          maxW="400px"
        >
          <Image
            src={defaultImg}
            alt={item.productName}
            w="100%"
            h="200px"
            borderRadius="lg"
          />
          <Text
            fontSize="2xl"
            h="70px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            lineHeight={8}
          >
            <strong>{item.productName}</strong>
          </Text>
          <p>
            Price: €{item.price} | Quantity: {item.quantity}
          </p>
          <p>Unit: {item.unit}</p>
          <p>Brand: {item.brand}</p>
          <p>Category: {item.category}</p>
          <Stack direction="row" spacing={4} align="center" mt={4}>
            <ModalProductEdition
              productDetail={item}
              allProducts={allProducts}
              displayMessage={displayMessage}
              setAllProducts={setAllProducts}
            />

            <ModalProductDeletion
              productId={item.id}
              allProducts={allProducts}
              displayMessage={displayMessage}
            />
          </Stack>
        </Box>
      ))}
    </Grid>
  );
}

export default ProductList;
