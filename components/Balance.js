import CustomContainer from "./CustomContainer";
import { Divider, Text } from "@chakra-ui/react";
import { useERC20Balances, useMoralisWeb3Api } from "react-moralis";
import { useEffect, useState } from "react";
import Moralis from "moralis";

function Balance({ user }) {
  const Web3Api = useMoralisWeb3Api();

  const { fetchERC20Balances, data } = useERC20Balances();
  const [ethBalance, setEthBalance] = useState(0);

  {
    /*Ensin fetchataan ETH balance, sen jälkeen etsitään ethereumin 
    päälle rakennetut ERC20 balancet (fetchERC20Balances - chainlink, polygon etc.) */
  }

  //Fetchataan ensin Ethereumin balance data
  const fetchNativeBalance = async () => {
    const result = await Web3Api.account
      .getNativeBalance({
        chain: "rinkeby",
        address: user.get("ethAddress"),
      })
      .catch((e) => console.log(e));

    //Muutetaan gweistä eth balanssiksi moraliksen avulla.
    if (result.balance) {
      setEthBalance(Moralis.Units.FromWei(result.balance));
    }
  };

  //Ladataan useEffectillä balancet aina sivu ladattaessa
  useEffect(() => {
    fetchNativeBalance();

    {
      /* Otetaan ethereumin päälle rakennettujen ERC20 tokenien balancet*/
    }
    fetchERC20Balances({
      params: {
        chain: "rinkeby",
        address: user.get("ethAddress"),
      },
    });
  }, []);

  return (
    <CustomContainer>
      <Text mb="6" fontSize="xl" fontWeight="bold">
        My ERC20 tokens
      </Text>
      <Text>
        {ethBalance}
        <b> ETH</b>
      </Text>
      <Divider />
      {data &&
        data.map((token) => (
          <div key={token.symbol}>
            <Text>
              {Moralis.Units.FromWei(token.balance)}
              <b> {token.symbol}</b>
            </Text>
          </div>
        ))}
    </CustomContainer>
  );
}

{
  /* 
Token symbol: Chainlink, polygon etc. (LINK)
Token balance: monta tokenia 
*/
}

export default Balance;
