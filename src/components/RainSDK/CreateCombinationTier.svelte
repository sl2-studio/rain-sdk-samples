<script lang="ts" type="module">
  import * as rainSDK from "rain-sdk";
  import { ethers, BigNumber } from "ethers";
  import { concat } from "ethers/lib/utils";
  import { op, selectLte } from "../../utils";

  const { ethereum } = window;

  const enum Opcode {
    END,
    VAL,
    DUP,
    ZIPMAP,
    BLOCK_NUMBER,
    BLOCK_TIMESTAMP,
    REPORT,
    NEVER,
    ALWAYS,
    DIFF,
    UPDATE_BLOCKS_FOR_TIER_RANGE,
    SELECT_LTE,
    ACCOUNT,
  }

  async function createBalanceTier(tierContractOne, tierContractTwo) {
    return new Promise(function (resolve, reject) {
      tierContractOne = tierContractOne.toLowerCase();
      if (!ethers.utils.isAddress(tierContractOne)) {
        reject(Error("Invalid tier one address."));
      }

      tierContractTwo = tierContractTwo.toLowerCase();
      if (!ethers.utils.isAddress(tierContractTwo)) {
        reject(Error("Invalid tier two address."));
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
              const constants = [
                ethers.BigNumber.from(tierContractOne),
                ethers.BigNumber.from(tierContractTwo),
              ];

              const source = concat([
                op(Opcode.VAL, 1),
                op(Opcode.ACCOUNT),
                op(Opcode.REPORT),
                op(Opcode.VAL, 0),
                op(Opcode.ACCOUNT),
                op(Opcode.REPORT),
                op(Opcode.BLOCK_NUMBER),
                op(Opcode.SELECT_LTE, selectLte(0, 0, 2)),
              ]);

              const tierState = {
                tierContractOne,
                tierContractTwo,
              };

              rainSDK.CombineTier.deploy(signer, {
                sources: [source],
                constants,
                stackLength: 8,
                argumentsLength: 0,
              }).then((result) => {
                resolve(result);
              });
            });
          })
          .catch((error) => {
            reject(Error(error));
          });
      }
    });
  }

  console.log("Creating Combination Tier, please wait.");

  createBalanceTier(
    "0x947bB1edba72a812E441d6CCaa514a1227721A7a",
    "0xC48E371edc35Bc037f4d7140668f8cDC4a02a94a"
  )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
</script>

<div class="d-flex align-items-center justify-content-between">
  <div class="d-flex">Create Combination Tier (see console)</div>
</div>

<div class="d-flex align-items-center justify-content-between">
  <div class="d-flex">
    <a href="/">Go back</a>
  </div>
</div>

<style>
</style>
