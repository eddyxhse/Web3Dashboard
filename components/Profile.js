import React, { useState } from "react";
import CustomContainer from "./CustomContainer";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";

function Profile({ user }) {
  const [input, setInput] = useState("");
  const { setUserData, isUserUpdating } = useMoralis();

  return (
    //Käytetään custom containeria (Tabejen esittämiseen - valkoinen alusta)
    <CustomContainer>
      <Text>
        <b>Username: </b> {user.getUsername()}
      </Text>
      <Text>
        <b>Wallet address: </b> {user.get("ethAddress")}
      </Text>

      {/*onSubmit muutetaan username data moralis databasessa */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() !== "") {
            setUserData({
              username: input,
            }).then(() => setInput(""));
          }
        }}
      >
        {/*Formi ja button, isUserUpdating disabloi buttonin käytön päivityksen ajaksi */}
        <FormControl mt="6" mb="6">
          <FormLabel htmlFor="username"> Set a new username:</FormLabel>
          <Input
            id="username"
            type="text"
            placeholder="Write new name here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></Input>
        </FormControl>
        <Button type="submit" colorScheme="purple" disabled={isUserUpdating}>
          Change username
        </Button>
      </form>
    </CustomContainer>
  );
}

export default Profile;
