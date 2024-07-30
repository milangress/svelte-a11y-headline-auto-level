<script>
    import { h } from './action';
  
    /** @type {number | string} */
    export let level = undefined;
    /** 
     * @typedef {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} HeadingTag
     */

    /**
     * @type {HeadingTag | undefined}
     */
    export let tag = undefined;

    let keepTag = tag ? true : false;
  </script>
  
  <svelte:element this={tag ? tag : 'span'} use:h={{ level, keepTag }}>
    <slot />
  </svelte:element>