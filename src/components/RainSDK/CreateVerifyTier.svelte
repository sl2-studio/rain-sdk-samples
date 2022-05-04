<script>
  import * as rainSDK from "rain-sdk";
  import { ethers, BigNumber } from "ethers";

  const { ethereum } = window;

  async function createVerifyTier() {
    return new Promise(function (resolve, reject) {
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
              rainSDK.Verify.deploy(signer, {
                admin: address,
                callback: ethers.constants.AddressZero,
              })
                .then((contract) => {
                  console.log(contract);
                  return contract.grantRole(contract.APPROVER_ADMIN(), address);
                })
                .then((txAdmin) => {
                  resolve(txAdmin);
                });
            });
          })
          .catch((error) => {
            reject(Error(error));
          });
      }
    });
  }

  console.log("Creating Verify Tier, please wait.");

  createVerifyTier()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
</script>

<div class="d-flex align-items-center justify-content-between">
  <div class="d-flex">Create Verify Tier (see console)</div>
</div>

<div class="d-flex align-items-center justify-content-between">
  <div class="d-flex">
    <a href="/">Go back</a>
  </div>
</div>

<style>
</style>
