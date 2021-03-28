import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useRef } from "react";

const ModalProductDeletion = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const deleteProductHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
    } catch (error) {
      console.error(error);
    }
    const deletedProductIndex = props.allProducts.findIndex(
      (item) => item.id === id
    );

    const deletedProduct = props.allProducts[deletedProductIndex];
    props.allProducts.splice(deletedProductIndex, 1);
    onClose();
    props.displayMessage(`${deletedProduct.productName} is deleted`);
  };

  return (
    <>
      <Button
        colorScheme="teal"
        variant="solid"
        width="50%"
        height="30px"
        borderRadius="full"
        onClick={() => setIsOpen(true)}
      >
        Delete
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this product? It will be removed
              permanently.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => deleteProductHandler(props.productId)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ModalProductDeletion;
