<script>
  import Router from "svelte-spa-router";

  // UI
  import Landing from "./components/UI/Landing.svelte";

  // Rain SDK
  import CreateBalanceTier from "./components/RainSDK/CreateBalanceTier.svelte";
  import CreateCombinationTier from "./components/RainSDK/CreateCombinationTier.svelte";

  let routes = {
    "/": Landing,
    "/create/balance/tier": CreateBalanceTier,
    "/create/combination/tier": CreateCombinationTier,
  };
</script>

<main>
  <Router {routes} />
</main>
