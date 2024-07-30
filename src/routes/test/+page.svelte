<script>
  import { section, h } from '$lib/action';
  import NestedComponent from './NestedComponent.svelte'
</script>

<main>

  <div data-testid="html-only-reference">
    <section>
      <h1 id="html-h1">Plain H1</h1>
      <section>
        <h1 id="html-h2">Plain H1</h1>
        <h1 id="html-h2-2">Plain H1</h1>
      </section>
      <section>
        <h2 id="html-h3">Plain H2</h2>
      </section>
    </section>
  </div>

  <hr>

  <div data-testid="basic-usage">
    <section use:section={{ level: 1 }}>
      <h1 use:h id="basic-h1">Basic H1</h1>
      <section use:section>
        <h1 use:h id="basic-h2">Basic H2</h1>
        <h1 use:h id="basic-h2-2">Another H2</h1>
      </section>
    </section>
  </div>
  
  <hr>
  
  <div data-testid="custom-tags">
    <div use:section={{ tag: 'article' }}>
      <h1 use:h id="custom-h1">Custom H1</h1>
      <div use:section={{ tag: 'aside' }}>
        <h1 use:h id="custom-h2">Custom H2</h1>
      </div>
    </div>
  </div>
  
  <hr>
  
  <div data-testid="custom-levels">
    <section use:section={{ level: 2 }}>
      <h1 use:h id="custom-level-h2">Custom Level H2</h1>
      <section use:section>
        <h1 use:h id="custom-level-h3">Custom Level H3</h1>
      </section>
      <section use:section={{ level: 1 }}>
        <h1 use:h id="custom-level-h1">Custom Level H1</h1>
      </section>
    </section>
  </div>
  
  <hr>
  
  <div data-testid="relative-levels">
    <section use:section={{ level: 3 }}>
      <h1 use:h={{ level: '+1' }} id="relative-h4">Relative H4</h1>
      <section use:section={{ level: '+1' }}>
        <h1 use:h id="relative-h5">Relative H5</h1>
      </section>
      <section use:section={{ level: '-1' }}>
        <h1 use:h id="relative-h3">Relative H3</h1>
      </section>
    </section>
  </div>
  
  <hr>
  
  <div data-testid="deep-nesting">
    <section use:section>
      <h1 use:h id="deep-h1">Deep H1</h1>
      <section use:section>
        <h1 use:h id="deep-h2">Deep H2</h1>
        <section use:section>
          <h1 use:h id="deep-h3">Deep H3</h1>
          <section use:section>
            <h1 use:h id="deep-h4">Deep H4</h1>
            <section use:section>
              <h1 use:h id="deep-h5">Deep H5</h1>
              <section use:section>
                <h1 use:h id="deep-h6">Deep H6</h1>
                <section use:section>
                  <h1 use:h id="deep-h6-2">Another Deep H6</h1>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  </div>
  
  <hr>
  
  <div data-testid="nested-component">
    <section use:section>
      <h1 use:h id="parent-h1">Parent H1</h1>
      <NestedComponent />
    </section>
  </div>
</main>