<script lang="ts">
	import { onMount } from 'svelte';

	import Reveal from 'reveal.js';
	import Highlight from 'reveal.js/plugin/highlight/highlight';
	import Markdown from 'reveal.js/plugin/markdown/markdown';
	import Notes from 'reveal.js/plugin/notes/notes';

	import 'reveal.js/dist/reveal.css';
	import 'reveal.js/dist/theme/simple.css';
	import 'reveal.js/plugin/highlight/monokai.css';

	import Presentation from './presentation.svelte';

	onMount(() => {
		const deck = new Reveal({
			plugins: [Markdown, Highlight, Notes],
			autoAnimateEasing: 'ease',
			autoAnimateDuration: 1,
			hash: true,
			controlsLayout: 'bottom-right',
			controlsBackArrows: 'faded',
			progress: true,
			slideNumber: true,
			touch: true
		});

		deck.initialize();
	});
</script>

<div class="reveal">
	<div class="slides">
		<Presentation />
	</div>
</div>
