<script>
  import Router from "svelte-spa-router";

  // UI
  import Landing from "./components/UI/Landing.svelte";

  // Rain SDK
  import CreateBalanceTier from "./components/RainSDK/CreateBalanceTier.svelte";
  import CreateCombinationTier from "./components/RainSDK/CreateCombinationTier.svelte";
  import CreateTransferTier from "./components/RainSDK/CreateTransferTier.svelte";
  import CreateVerifyTier from "./components/RainSDK/CreateVerifyTier.svelte";

  let routes = {
    "/": Landing,
    "/create/balance/tier": CreateBalanceTier,
    "/create/combination/tier": CreateCombinationTier,
    "/create/transfer/tier": CreateTransferTier,
    "/create/verify/tier": CreateVerifyTier,
  };
</script>

<main>
  <Router {routes} />
</main>
