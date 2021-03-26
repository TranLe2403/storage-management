import { Box, Grid, Image, Text, Stack, Button } from "@chakra-ui/react";
import allImages from "../images/images";
import ModalProductDeletion from "./ModalProductDeletion";

function ProductList(props) {
  if (!props.show) {
    return null;
  }

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {props.allProducts.map((item) => (
        <Box
          key={item.id}
          bg="tomato"
          w="400px"
          color="white"
          m="30px auto"
          p="30px"
          borderRadius="lg"
          boxShadow="2xl"
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
              setAllProducts={props.setAllProducts}

            />
          </Stack>
        </Box>
      ))}
    </Grid>
  );
}

export default ProductList;
