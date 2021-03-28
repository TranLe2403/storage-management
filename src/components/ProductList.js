import { useState, useEffect } from "react";
import { Box, Grid, Image, Text, Stack, Button } from "@chakra-ui/react";
import allImages from "../images/images";
import ModalProductDeletion from "./ModalProductDeletion";

function ProductList(props) {
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

  if (!props.show) {
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
      {props.allProducts.map((item) => (
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
            src={allImages[Math.floor(Math.random() * allImages.length)]}
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
            <Button
              colorScheme="teal"
              variant="solid"
              width="50%"
              height="30px"
              borderRadius="full"
            >
              Edit
            </Button>

            <ModalProductDeletion
              productId={item.id}
              allProducts={props.allProducts}
              displayMessage={props.displayMessage}
            />
          </Stack>
        </Box>
      ))}
    </Grid>
  );
}

export default ProductList;
