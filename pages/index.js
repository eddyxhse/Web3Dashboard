import {
  Flex,
  Text,
  Button,
  Container,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Head from "next/head";
import { useMoralis } from "react-moralis";
import Balance from "../components/Balance";
import Header from "../components/Header";
import Nft from "../components/Nft";
import Profile from "../components/Profile";
import Send from "../components/Send";
import Transactions from "../components/Transactions";

export default function Home() {
  const { isAuthenticated, authenticate, logout, user, isLoggingOut } =
    useMoralis();

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | Dashboard</title>
        </Head>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
          bgGradient="linear(to-br, teal.400, purple.300)"
        >
          <Text fontSize="5xl" fontWeight="bold" color="white">
            Dashboard
          </Text>

          {/* Login button ja moralis authenticate()*/}
          <Button
            colorScheme="purple"
            size="lg"
            mt="4"
            onClick={() =>
              authenticate({
                signingMessage: "Signing to dashboard",
              })
            }
          >
            Login with metamask
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Flex direction="column" width="100vw" height="100vw">
        {/* Header.js komponentti mihin lähetetään user data, logout ja isloggingout eli buttonin painamisen / logoutin välinen aika.*/}
        <Header user={user} logout={logout} isLoggingOut={isLoggingOut} />
        <Box flex="1" bg="purple.100" px="44" py="22">
          <Tabs size="lg" colorScheme="red" align="center" variant="enclosed">
            {/* Tässä tabin nimet*/}
            <TabList>
              <Tab fontWeight="bold">Profile</Tab>
              <Tab fontWeight="bold">Balance</Tab>
              <Tab fontWeight="bold">Transactions</Tab>
              <Tab fontWeight="bold">NFTs</Tab>
              <Tab fontWeight="bold">Send ETH</Tab>
            </TabList>

            {/* Tässä tabin datat ja ohjaus komponentteihin*/}
            <TabPanels>
              {/* Profile.js komponentti ja propsina user object*/}
              <TabPanel>
                <Profile user={user} />
              </TabPanel>
              {/* Balance.js komponentti ja propsina user object*/}
              <TabPanel>
                <Balance user={user} />
              </TabPanel>
              {/* Transactions.js komponentti ja propsina user object*/}
              <TabPanel>
                <Transactions user={user} />
              </TabPanel>
              {/* Nft.js komponentti ja propsina user object*/}
              <TabPanel>
                <Nft user={user} />
              </TabPanel>
              {/* Send.js komponentti*/}
              <TabPanel>
                <Send />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  );
}
