<script lang="ts">
	import Slide from './slide.svelte';
</script>

<Slide>
	<h3>CSE 4502</h3>
	<h5>Lab 01 - Bootloader & Physical Memory Management</h5>

	<br />
	<p class="ids">210042174 & 210042176</p>
</Slide>

<Slide>
	<Slide>
		<h3>The Problem?</h3>
	</Slide>
	<Slide>
		<h5>
			We do <strong>NOT</strong> know which part of the physical RAM are free and which are currently
			in use.
		</h5>
	</Slide>
</Slide>

<Slide animate>
	<Slide>
		<h3>Solution</h3>
	</Slide>
	<Slide>
		<h6>
			We need to implement the various parts of the physical memory management module in multiple
			layers of abstraction.
		</h6>
	</Slide>

	<Slide>
		<p>
			We work on these layers from the bottom up. That way we can import the lower layers functions
			and use them in the higher layers.
		</p>
		<ul class="ul-list">
			<li>MATIntro Layer</li>
			<li>MATInit Layer</li>
			<li>MATOp Layer</li>
		</ul>
	</Slide>
</Slide>

<Slide>
	<Slide>
		<h3>MATIntro Layer</h3>
		<p>The lowest layer of the physical memory management.</p>
	</Slide>
	<Slide>
		<p>
			We implement the core getter setter functions for the PAGES structure as mCertiKOS manages the
			PC's physical memory with page granularity. The functions mainly include:
		</p>

		<ul class="func-list">
			<li>at_is_norm()</li>
			<li>at_set_perm()</li>
			<li>at_is_allocated()</li>
			<li>at_set_allocated()</li>
		</ul>
	</Slide>
</Slide>

<Slide>
	<Slide>
		<h3>MATInit Layer</h3>
		<p>The layer responsible for initializing the physical memory.</p>
	</Slide>
	<Slide>
		<p>
			The main initialization function for the physical memory is <strong>pmem_init()</strong>. It
			calculates the actual physical memory of the machine, and sets the number of physical pages.
		</p>

		<ul class="func-list">
			<li>pmem_init()</li>
		</ul>
	</Slide>
</Slide>

<Slide>
	<Slide>
		<h3>MATOp Layer</h3>
		<p>The layer responsible for the operations on the physical memory.</p>
	</Slide>
	<Slide>
		<p>
			We have the memory operations functions to allocate and deallocate the physical memory. We
			also ensure to keep track of the free and allocated pages through <strong>
				Memoization
			</strong>.
		</p>

		<ul class="func-list">
			<li>palloc()</li>
			<li>pfree()</li>
		</ul>
	</Slide>
</Slide>

<Slide>
	<h2>Thank You!</h2>
</Slide>

<style>
	p {
		font-size: 1.8rem;
	}

	.ids {
		font-size: 1.8rem;
		color: darkblue;
	}

	.ul-list {
		list-style-type: square;
		font-size: 1.6rem;
		color: darkgreen;
	}

	.func-list {
		list-style-type: circle;
		font-size: 1.7rem;
		color: darkred;
	}
</style>
