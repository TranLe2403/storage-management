import productData from "../products.json";
import { Box, Grid, Image, Text, Stack, Button } from "@chakra-ui/react";
import allImages from "../images/images";

function ProductList(props) {
  if (!props.show) {
    return null;
  }
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {productData.products.map((item) => (
        <Box
          key={item.id}
          bg="tomato"
          width="400px"
          p={6}
          color="white"
          margin="30px auto"
          padding="30px"
          borderRadius="lg"
          shadow="2xl"
        >
          <Image
            src={allImages[Math.floor(Math.random() * allImages.length)]}
            alt={item.productName}
            width="100%"
            height="200px"
            borderRadius="lg"
          />
          <Text fontSize="20px">
            <strong>{item.productName}</strong>
          </Text>
          <p>
            Price: €{item.price} | Quantity: {item.quantity}
          </p>
          <p>Unit: {item.unit}</p>
          <p>Brand: {item.brand}</p>
          <p>Category: {item.category}</p>
          <Stack direction="row" spacing={4} align="center" marginTop={4}>
            <Button
              colorScheme="teal"
              variant="solid"
              width="50%"
              height="30px"
              borderRadius="full"
            >
              Edit
            </Button>
            <Button
              colorScheme="teal"
              variant="solid"
              width="50%"
              height="30px"
              borderRadius="full"
            >
              Delete
            </Button>
          </Stack>
        </Box>
      ))}
    </Grid>
  );
}

export default ProductList;
