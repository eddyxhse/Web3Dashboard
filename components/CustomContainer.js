import { Box } from "@chakra-ui/react";
import React from "react";

{
  /*Custom container, jota käytetään tabejen datoissa */
}

function CustomContainer({ children }) {
  return (
    <Box
      bg="white"
      width="full"
      height="full"
      px="20"
      py="10"
      rounded="lg"
      shadow="lg"
      textAlign="left"
    >
      {children}
    </Box>
  );
}

export default CustomContainer;
