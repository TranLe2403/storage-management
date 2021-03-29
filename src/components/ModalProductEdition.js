import { useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";

const ModalProductEdition = ({
  productDetail,
  allProducts,
  displayMessage,
  setAllProducts,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oldProductDetail, setOldProductDetail] = useState(productDetail);

  const initialRef = useRef();
  const finalRef = useRef();

  const editProductHandler = async () => {
    const productEdited = {
      id: oldProductDetail.id,
      productName: oldProductDetail.productName,
      quantity: oldProductDetail.quantity,
      price: oldProductDetail.price,
      category: oldProductDetail.category,
      brand: oldProductDetail.brand,
      unit: oldProductDetail.unit,
    };
    try {
      await axios.put(
        `http://localhost:3001/products/${oldProductDetail.id}`,
        productEdited
      );

      const newProductArr = allProducts.map((item) =>
        item.id === oldProductDetail.id ? productEdited : item
      );
      setAllProducts(newProductArr);

      onClose();
      displayMessage(
        `Product ${oldProductDetail.productName} is edited successfully`
      );
    } catch (error) {
      displayMessage(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="teal"
        variant="solid"
        width="50%"
        height="30px"
        borderRadius="full"
      >
        Edit
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Product name"
                value={oldProductDetail.productName}
                onChange={({ target }) =>
                  setOldProductDetail({
                    ...oldProductDetail,
                    productName: target.value,
                  })
                }
              />
            </FormControl>

            <Stack direction="row" spacing={4} align="center" mt={4}>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Price"
                  value={oldProductDetail.price}
                  onChange={({ target }) =>
                    setOldProductDetail({
                      ...oldProductDetail,
                      price: target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={oldProductDetail.quantity}
                  onChange={({ target }) =>
                    setOldProductDetail({
                      ...oldProductDetail,
                      quantity: target.value,
                    })
                  }
                />
              </FormControl>
            </Stack>

            <FormControl mt={4}>
              <FormLabel>Brand</FormLabel>
              <Input
                type="string"
                placeholder="Brand"
                value={oldProductDetail.brand}
                onChange={({ target }) =>
                  setOldProductDetail({
                    ...oldProductDetail,
                    brand: target.value,
                  })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                type="string"
                placeholder="Category"
                value={oldProductDetail.category}
                onChange={({ target }) =>
                  setOldProductDetail({
                    ...oldProductDetail,
                    category: target.value,
                  })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Unit</FormLabel>
              <Input
                type="string"
                placeholder="Unit"
                value={oldProductDetail.unit}
                onChange={({ target }) =>
                  setOldProductDetail({
                    ...oldProductDetail,
                    unit: target.value,
                  })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={editProductHandler}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalProductEdition;
