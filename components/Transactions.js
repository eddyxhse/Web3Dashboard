import { Divider, Link, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import CustomContainer from "./CustomContainer";
import { ArrowRightIcon } from "@chakra-ui/icons";

function Transactions({ user }) {
  const web3Api = useMoralisWeb3Api();
  const BASE_URL = "https://rinkeby.etherscan.io/tx/";

  {
    /*Tehdään transaktio array, joka myöhemmin mapataan läpi ja tehdään niistä linkkejä */
  }
  const [transactions, setTransactions] = useState([]);

  //Fetchataan käyttäjän transaktiot
  const fetchTransactions = async () => {
    const data = await web3Api.account.getTransactions({
      chain: "rinkeby",
      address: user.get("ethAddress"),
      limit: 5, //Transaktioiden määrä
    });
    if (data) {
      setTransactions(data.result);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <CustomContainer>
      <Text fontSize="xl" mb="6" fontWeight="bold">
        My last 5 transactions
      </Text>
      {/*Mapataan transaktio array läpi, tehdään transaktio hasheista linkit ja tulostetaan transaktiot sivulle */}
      {transactions &&
        transactions.map((transactions) => (
          <div key={transactions.hash}>
            <Link href={`${BASE_URL}${transactions.hash}`} isExternal>
              <ArrowRightIcon w={6} h={6} />
              &nbsp;
              {transactions.hash}
            </Link>
            <Divider />
          </div>
        ))}
    </CustomContainer>
  );
}

export default Transactions;
