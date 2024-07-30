# svelte-a11y-headline-auto-level

A Svelte component that automatically levels headings based on the document structure.
it keeps track of the current level in its context across all your components and can be used to set the level of headings dynamically.


## Usage

### Basic example

```svelte
// my-component.svelte

<template>
  <document-section>
    <document-heading>My Heading</document-heading>

    <document-section>
      <document-heading>My Child Heading</document-heading>
      <p>Lorem ipsum ...</p>

      <document-heading>My Child Heading</document-heading>
      <p>Lorem ipsum ...</p>

      <document-heading>My Child Heading</document-heading>
      <p>Lorem ipsum ...</p>

      <document-section>
        <document-heading>My Grand Child Heading</document-heading>
        <p>Lorem ipsum ...</p>

        <document-heading>My Grand Child Heading</document-heading>
        <p>Lorem ipsum ...</p>
      </document-section>
    </document-section>
  </document-section>
</template>
```

Renders following document structure:

```html
<section>
  <h1>My Heading</h1>

  <section>
    <h2>My Child Heading</h2>
    <p>Lorem ipsum ...</p>

    <h2>My Child Heading</h2>
    <p>Lorem ipsum ...</p>

    <h2>My Child Heading</h2>
    <p>Lorem ipsum ...</p>

    <section>
      <h3>My Grand Child Heading</h3>
      <p>Lorem ipsum ...</p>

      <h3>My Grand Child Heading</h3>
      <p>Lorem ipsum ...</p>
    </section>
  </section>
</section>
```

### Use as Action with your own components or elements

```svelte
<script>
  import { h, section } from 'svelte-a11y-headline-auto-level';
</script>

<section use:section>
  <h1 use:h>My Heading</h1>
  <section use:section>
    <h1 use:h={{setTag: true}}>My Heading</h1>
    <h1 use:h>My Heading</h1>
  </section>
</section>
```

results in:
```html
<section>
  <h1>My Heading</h1>
  <section>
    <h2>My Heading</h2>
    <h1 aria-level="2">My Heading</h1>
  </section>
</section>
```



### Custom section tag

If you don't like `<section>` element, you can pass any other tag into the `tag` prop:

```svelte
<document-section tag="main">
  <document-section tag="nav">
    ...
  </document-section>
  <document-section tag="footer">
    ...
  </document-section>
</document-section>
```

### Custom section level

You can adjust the current level of section by passing custom level via prop:

```svelte
<document-section level="2"> <!-- This section would normally be level 1 -->
  <document-section><!-- This section will have level 3 (parent + 1) -->
    <document-heading>H3</document-heading>
  </document-section>
  <document-section level="1"><!-- ignores the parent and sets the level to 1 -->
    <document-heading>H1</document-heading>
  </document-section>
</document-section>
```

### Relative section level

You can set the current level of the section relatively to it's parent section.

```svelte
<document-section level="4">
  <document-section level="+2"><!-- This section will have level 6 (parent + 2) -->
    <document-heading>H6</document-heading>
  </document-section>
  <document-section level="-2"><!-- This section will have level 2 (parent - 2) -->
    <document-heading>H2</document-heading>
  </document-section>
</document-section>
```

### Custom heading level

You can adjust the current level of heading by passing custom level via prop:

```svelte
<document-section>
  <document-section>
    <document-heading level="5">H5</document-heading> <!-- ignores the parent level and use level 5 -->
  </document-section>
  <document-section>
    <document-heading level="1">H1</document-heading><!-- ignores the parent and sets the level to 1 -->
  </document-section>
</document-section>
```

### Relative heading level

You can set the current level of the heading relatively to it's parent section.

```svelte
<document-section level="4">
  <document-heading level="-2">H2</document-heading><!-- This heading will have level 2 (parent - 2) -->
  <document-section level="2">
    <document-heading level="+3">H5</document-heading><!-- This heading will have level 5 (parent + 3) -->
  </document-section>
</document-section>
```

### Heading rank overflow

Heading level cannot reach level lower than 1 and greater than 6. If calculated level is lower than one, it will become 1. If calculated level is greater than 6, it will become 6.

```svelte
<document-section level="100">
  <document-heading>H6</document-heading>
  <document-heading level="-200">H1</document-heading>
  <document-heading level="+100">H6</document-heading>
</document-section>
```