import { Text } from "@chakra-ui/react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <Text fontSize="xl" color="tomato" ml={10}>
      {message}
    </Text>
  );
};

export default Notification;
