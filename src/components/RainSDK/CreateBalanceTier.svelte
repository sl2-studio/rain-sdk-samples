<script>
  import * as rainSDK from "rain-sdk";
  import { ethers, BigNumber } from "ethers";

  const { ethereum } = window;

  async function createBalanceTier(
    erc20Token,
    tier1,
    tier2,
    tier3,
    tier4,
    tier5,
    tier6,
    tier7,
    tier8
  ) {
    return new Promise(function (resolve, reject) {
      erc20Token = erc20Token.toLowerCase();
      if (!ethers.utils.isAddress(erc20Token)) {
        reject(Error("Invalid ERC20 token address."));
      }

      if (!ethereum) {
        reject(Error("Web3 is not detected!"));
      } else {
        const provider = new ethers.providers.Web3Provider(ethereum, {
          name: typeof NETWORK !== "undefined" ? NETWORK : "Mumbai",
          chainId: typeof CHAIN_ID !== "undefined" ? CHAIN_ID : 80001,
        });

        provider
          .send("eth_requestAccounts", [])
          .then(() => {
            const signer = provider.getSigner();
            signer.getAddress().then((address) => {
              const tierState = {
                erc20: erc20Token,
                tierValues: [
                  ethers.utils.parseUnits(tier1, 18),
                  ethers.utils.parseUnits(tier2, 18),
                  ethers.utils.parseUnits(tier3, 18),
                  ethers.utils.parseUnits(tier4, 18),
                  ethers.utils.parseUnits(tier5, 18),
                  ethers.utils.parseUnits(tier6, 18),
                  ethers.utils.parseUnits(tier7, 18),
                  ethers.utils.parseUnits(tier8, 18),
                ],
              };

              rainSDK.ERC20BalanceTier.deploy(signer, tierState).then(
                (result) => {
                  resolve(result);
                }
              );
            });
          })
          .catch((error) => {
            reject(Error(error));
          });
      }
    });
  }

  console.log("Creating Balance Tier, please wait.")

  createBalanceTier(
    "0x37FD5028eECa243571773d15bD4FE0Be24e2c1D2",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8"
  )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
</script>

<div class="d-flex align-items-center justify-content-between">
  <div class="d-flex">
    Create Balance Tier (see console)
  </div>
</div>

<div class="d-flex align-items-center justify-content-between">
  <div class="d-flex">
    <a href="/">Go back</a>
  </div>
</div>

<style>
</style>