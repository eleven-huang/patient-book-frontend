<script>
	import {link} from "svelte-routing"
	import Header from "./Header.svelte"
	import {fade} from 'svelte/transition'
	import {emailValidator, requiredValidator} from './Validators.js'
	import { createFieldValidator } from './Validation.js'

  const [validity, validate] = createFieldValidator(requiredValidator(), emailValidator());

	let is_register = false;
	let is_registed;
	let name, number, birth, email, address, photo_id, appointment;
	let window_height;

	async function submit() {
		const res = await fetch('/api/patients', {
			method: 'post',
			body: JSON.stringify({
				name,
				number,
				birth,
				email,
				address,
				photo_id,
				appointment
			})
		});

		if (res.status == 200) {
			name = number = birth = email = address = photo_id = appointment = null;
			is_registed = true;
			is_register = false;
		}
	}
</script>

<svelte:window bind:outerHeight={window_height}/>

<div id="context" class="" style="width: 100%; height: {window_height}px;">

<Header />

{#if is_register}
	<div class="container" id="register-box" transition:fade>
		<div class="row">
			<label class="offset-lg-2 col-lg-8">Name</label>
			<input class="offset-lg-2 col-lg-8" placeholder="Jack Smith" bind:value={name} autofocus/>
		</div>

		<div class="row">
			<label class="offset-lg-2 col-lg-8">Birth</label>
			<input class="offset-lg-2 col-lg-8" type="date" placeholder="Jack" bind:value={birth}/>
		</div>

		<div class="row">
			<label class="offset-lg-2 col-lg-8">Number</label>
			<input class="offset-lg-2 col-lg-8" placeholder="541-754-3010" type="tel" bind:value={number}/>
		</div>

		<div class="row">
			<label class="offset-lg-2 col-lg-8">Email</label>
			<input class="offset-lg-2 col-lg-8" placeholder="example@example.com" type="" bind:value={email} lass:field-danger={!$validity.valid}
			class:field-success={$validity.valid}
      use:validate={email}/>
			{#if $validity.dirty && !$validity.valid}
				<div class="validation-hint offset-lg-2 col-lg-8">
					INVALID - {$validity.message} {$validity.dirty}
				</div>
			{/if}
		</div>

		<div class="row">
			<label class="offset-lg-2 col-lg-8">Address</label>
			<input class="offset-lg-2 col-lg-8" placeholder="187 Glenholme Avenue
Poughkeepsie, NY 12601" type="" bind:value={address}/>
		</div>

		<div class="row">
			<label class="offset-lg-2 col-lg-8">Photo ID</label>
			<input class="offset-lg-2 col-lg-8" placeholder="14569178357" type="" bind:value={photo_id} />
		</div>

		<div class="row">
			<label class="offset-lg-2 col-lg-8">Appointment</label>
			<input class="offset-lg-2 col-lg-8" placeholder="" type="datetime-local" bind:value={appointment} />
		</div>

		<div class="row">
			<div class="offset-lg-2"></div>
			<button class="btn btn-primary btn-red" disabled={$validity.message || !(name && number && birth && email && address && photo_id && appointment)} on:click={submit}>Submit</button>
			<button id="cancel-register" class="btn btn-primary btn-light" on:click={() => is_register = false}>back</button>
		</div>
	</div>

{:else}
		<main transition:fade>
			{#if is_registed}
				<h1 class="the-red">Congratulations!</h1>
				<hr class="divider"/>
				<p>We will contact you as soon as possible. </p>
				<a class="btn btn-primary btn-red" href="admin" use:link>TO Admin</a>
				<button class="btn btn-primary btn-light" on:click={() => is_register = is_registed = false}>BACK</button>
			{:else}
				<h1>Welcome</h1>
				<hr class="divider">
				<p>We will do our best to help you, please <span class="the-red">register</span> and fill in your information. </p>
				<button class="btn btn-primary btn-red" on:click={() => is_register = true}>REGISTER</button>
			{/if}
		</main>

{/if}

</div>

<style>
	#context {
		/* width: 100%; */
		/* height: 100%; */
		background: linear-gradient(to bottom, rgba(92, 77, 66, 0.8) 0%, rgba(92, 77, 66, 0.8) 100%), url(/assets/patient-based.jpg);
		background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
		background-color: #f4623a;
	}

	.row {
		margin-top: 5px;
	}

	#register-box, main {
		text-align: center;
		padding: 1em;
		max-width: 60%;
		margin: 0 auto;
		padding-top: 17%;
	}

	#register-box {
		/* background-color: red; */
	}

	#register-box > input {

	}

	h1 {
		color: white;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 700;
	}

	.divider {
		/* width: 50px;
		height: 4px;
		background-color: red;
		float: center; */

		max-width: 3.25rem;
    border-width: 0.2rem;
    border-color: #f4623a;
	}

	.the-red {
		color: #f4623a;
	}

	#cancel-register {
		margin-left: 12px;
	}

	.btn-red {
		margin-top: 20px;
		background-color: #f4623a;
		color: white;
		padding: 1rem 2rem;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    border: none;
    border-radius: 10rem;
	}

	.btn-light {
		margin-top: 20px;
		background-color: transparent;
		color: rgba(255, 255, 255, 0.7);
		border-color: rgba(255, 255, 255, 0.7);
		padding: 1rem 2rem;
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		/* border: none; */
		border-radius: 10rem;

	}

	main > p {
		color: rgba(255, 255, 255, 0.75);
		font-weight: 300;
	}

	input {
		background-color: transparent;

		border-color: #f4623a;
		color: white;
	}

	::-webkit-calendar-picker-indicator {
    filter: invert(1);
	}

	label {
		color: rgba(255, 255, 255, 0.75);
		font-weight: 700;
		text-align: left;
	}

	.validation-hint {
		text-align: left;
		color: rgba(255, 255, 255, 0.75);
		font-weight: 100;
	}


	a:visited {

		color: rgba(255, 255, 255, 0.7);

	}

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: rgba(255, 255, 255, 0.5);
	  opacity: 1; /* Firefox */
	}

	:-ms-input-placeholder { /* Internet Explorer 10-11 */
	  color: rgba(255, 255, 255, 0.5);
	}

	::-ms-input-placeholder { /* Microsoft Edge */
	  color: rgba(255, 255, 255, 0.5);
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
