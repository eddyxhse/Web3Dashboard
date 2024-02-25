import { Button, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";

function Header({ user, logout, isLoggingOut }) {
  return (
    <header>
      <Flex
        px="10"
        py="6"
        justifyContent="space-between"
        bg="purple.400"
        color="white"
      >
        <Center>
          <Text fontSize="xl" fontWeight="bold">
            Dashboard
          </Text>
        </Center>
        <Center>
          {/* User objecti, ja otetaan getUsername() moralis databasesta käyttäjän random generoitu username*/}
          <Text>{user.getUsername()}</Text>
          <Button
            ml="4"
            colorScheme="blue"
            onClick={logout}
            disabled={isLoggingOut}
          >
            Logout
          </Button>
        </Center>
      </Flex>
    </header>
  );
}

export default Header;
