<script>
    import { section } from './action';
  
    /** @type {number | string} */
    export let level = undefined;
    /** @type {string} */
    export let tag = 'section';
  </script>
  
<svelte:element this={tag} use:section={{ level, tag }}>
    <slot />
</svelte:element>