<script>
    import { section, h } from '$lib/action';
  </script>
  
  <section use:section>
    <h1 use:h id="nested-h2">Nested H2</h1>
    <section use:section>
      <h1 use:h id="nested-h3">Nested H3</h1>
    </section>
  </section>