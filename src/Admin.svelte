<script>
  	import AdminHeader from "./AdminHeader.svelte"
    import { onMount } from 'svelte';

    let window_height, window_width;
    let patients = [];

    onMount(async () => {
      const res = await fetch("/api/patients");
      patients = await res.json();
    });
</script>


<div class="" id="admin" style="">
  <AdminHeader />

  <div class="container" id="patients-list">
    <h2>Patients</h2>
    <!-- <div class="admin-divider"></div> -->
    <table class="table">
      <thead>
        <th>Name</th>
        <th>Photo ID</th>
        <th>Birth</th>
        <th>Number</th>
        <th>Email</th>
        <th>Appointment</th>
        <th>Address</th>
      </thead>
      <tbody>
        {#each patients as patient (patient.id)}
          <tr>
            <td>{patient.name}</td>
            <td>{patient.photo_id}</td>
            <td>{patient.birth}</td>
            <td>{patient.number}</td>
            <td>{patient.email}</td>
            <td>{patient.appointment}</td>
            <td>{patient.address}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>

  #admin {
    width: 100%;
    height: 100%;
    /* background-color: #f4623a; */
    /* margin-top: 0; */
    /* margin-top: 70px; */
  }

  :global(body) {
      background-color: #f4623a;
  }

  #patients-list {
    padding-top: 100px;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    /* background-color: white; */
    /* position: absolute; */
    /* width: 100%; */
  }

  .admin-divider {
    width: 100px;
    height: 7px;
    background-color: rgba(255, 255, 255, 0.7);
  }

  .table {
    color: white;
  }

  th {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 100;
  }

</style>
