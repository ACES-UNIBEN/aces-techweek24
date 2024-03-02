<script>
	import currency from 'currency.js';
	import 'normalize.css';
	import '../app.css';

	let bill = '';
	let percent = 0;
	let people = '';
	let rate,
		custom_rate = '';

	let amount = 0;
	let total = 0;
	const rates = ['5', '10', '15', '25', '50'];

	function handleRates() {
		custom_rate = '';

		calculateTip(parseInt(this.value));
	}
	function handleCustomRate() {
		rate = '';
		calculateTip(parseInt(this.value));
	}

	const calculateTip = (Rate = rate) => {
		if (!people || !bill || !Rate) return;
		const percentage = (bill / 100) * Rate;
		amount = percentage / people;
		total = bill / people;
	};

	function handleInput() {
		if (!people || !bill || !rate) {
			amount = 0;
			total = 0;
			return;
		}
		calculateTip();
	}

	function uncheckRadios() {
		const radios = document.querySelector('input[name="rates"]:checked');
		if (radios) radios.checked = false;
	}

	function handleReset() {
		bill = '';
		people = '';
		amount = 0;
		total = 0;

		uncheckRadios();
		// empty Custom Tip Field;
		custom_rate = '';

		//focusBillField()
		document.getElementById('bill').focus();
	}
</script>

<header class="header">
	<h1 class="logo">
		<img src="/logo.svg" alt="Splitter" width="87" height="54" />
	</h1>
</header>
<main class="container">
	<form class="form">
		<div class="form-group">
			<label for="bill" class="form-label">Bill</label>
			<input
				type="number"
				min="1"
				step="any"
				name="bill"
				id="bill"
				class="form-control form-dollar"
				placeholder="0"
				aria-invalid={bill === 0 ? 'true' : 'false'}
				bind:value={bill}
				on:keyup={handleInput}
			/>

			{#if bill === 0}
				<span class="form-message">Can't be zero</span>
			{/if}
		</div>

		<div class="form-group">
			<label class="form-label">Select Tip %</label>

			<div class="radio-group">
				{#each rates as tip_rate, i}
					<div class="radio">
						<input
							type="radio"
							name="rates"
							id="rate_{i}"
							class="sr-only"
							on:change={handleRates}
							value={tip_rate}
							bind:group={rate}
						/>
						<label for="rate_{i}" class="btn">{tip_rate}%</label>
					</div>
				{/each}

				<label for="custom" class="sr-only">Custom Tip</label>
				<input
					type="text"
					name="custom"
					id="custom"
					class="form-control form-custom"
					placeholder="Custom"
					on:click={uncheckRadios}
					bind:value={custom_rate}
					on:keyup={handleCustomRate}
				/>
			</div>
		</div>

		<div class="form-group">
			<label for="people" class="form-label">Number of People</label>

			<input
				type="number"
				name="people"
				id="people"
				class="form-control form-person"
				placeholder="0"
				aria-invalid={people === 0 ? 'true' : 'false'}
				bind:value={people}
				on:keyup={handleInput}
			/>

			{#if people === 0}
				<span class="form-message">Can't be zero</span>
			{/if}
		</div>
	</form>

	<div class="card">
		<div class="card-row">
			<p class="card-label">
				<span>Tip Amount</span>
				<small>/ person</small>
			</p>
			<p class="card-money">{currency(amount).format()}</p>
		</div>

		<div class="card-row">
			<p class="card-label">
				<span>Total</span>
				<small>/ person</small>
			</p>
			<p class="card-money">{currency(total).format()}</p>
		</div>

		<button type="button" class="btn btn-strong" disabled={!amount} on:click={handleReset}
			>Reset</button
		>
	</div>
</main>

<footer class="footer" style="padding:1rem;">ACES UNIBEN</footer>
