<script>
  import {link} from "svelte-routing"
</script>

<nav class="navbar navbar-expand-lg fixed-top">
  <div class="container">
    <a class="navbar-brand" href="/">PatientBook</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="admin" use:link>Admin</a>
        </li>
      </ul>
    </div>
  </div>
</nav>


<style>
  .navbar {
    background-color: transparent;
  }

  .navbar-brand {
    display: inline-block;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
		color: rgba(255, 255, 255, 0.7);
    font-weight: 700;
	}

  .nav-link {
    font-weight: 700;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);

  }

  @media (min-width: 992px) {
    .navbar-expand-lg .navbar-nav .nav-link {
      padding: 0 1rem;
    }
  }

  .ml-auto {
    margin-left: auto !important;
  }
</style>
