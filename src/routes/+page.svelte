<script>
    import DocumentSection from '$lib/DocumentSection.svelte';
    import DocumentHeading from '$lib/DocumentHeading.svelte';
    import { section, h } from '$lib/action';
</script>
  
  <DocumentSection>
    <DocumentHeading>Main Heading</DocumentHeading>
    <DocumentSection>
      <DocumentHeading>Sub Heading</DocumentHeading>
      <p>Some content...</p>
    </DocumentSection>
  </DocumentSection>
  
  <p>Or using actions directly:</p>

  <section use:section>
    <h1 use:h>Main Heading</h1>
    <div use:section>
      <h1 use:h>Sub Heading</h1>
      <p>Some content...</p>
      <div use:section>
        <h1 use:h={{setTag: true}}>My Heading 1</h1>
        <p>Some content...</p>
      </div>
    </div>
  </section>
 