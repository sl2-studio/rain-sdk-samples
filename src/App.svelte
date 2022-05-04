<script>
  import Router from "svelte-spa-router";

  // UI
  import Landing from "./components/UI/Landing.svelte";

  // Rain SDK
  import CreateBalanceTier from "./components/RainSDK/CreateBalanceTier.svelte";

  let routes = {
    "/": Landing,
    "/create/balance/tier": CreateBalanceTier,
  };
</script>

<main>
  <Router {routes} />
</main>
