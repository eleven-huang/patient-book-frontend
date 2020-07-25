<script>
  import {Router, Route} from "svelte-routing"
  import Admin from "./Admin.svelte"
  import Home from "./Home.svelte"
</script>

<Router>
  <slot></slot>

  <Route path="/" component="{Home}"/>
  <Route path="admin" component="{Admin}" />
  <Route component="{Home}" />
</Router>
