import { render } from '@testing-library/svelte';
//import userEvent from '@testing-library/user-event';
import { test, expect, describe } from 'vitest';
import { section, h } from './action';

// Helper function to create a test component
function createTestElement(action, options = {}) {
  const div = document.createElement('div');
  action(div, options);
  return div;
}

describe('section action', () => {
  test('default behavior', () => {
    const element = createTestElement(section);
    expect(element.tagName).toBe('DIV');
    // We can't directly test the context, but we'll test it indirectly with nested headings
  });

  test('custom level', () => {
    const element = createTestElement(section, { level: 3 });
    expect(element.tagName).toBe('DIV');
    // We'll test the effect of this in nested scenarios
  });

  test('relative level', () => {
    const element = createTestElement(section, { level: '+2' });
    expect(element.tagName).toBe('DIV');
    // We'll test the effect of this in nested scenarios
  });

  test('custom tag', () => {
    const element = createTestElement(section, { tag: 'article' });
    expect(element.tagName).toBe('ARTICLE');
  });
});

describe('h action', () => {
  test('default behavior', () => {
    const element = createTestElement(h);
    expect(element.tagName).toBe('H1');
  });

  test('custom level', () => {
    const element = createTestElement(h, { level: 3 });
    expect(element.tagName).toBe('H3');
  });

  test('relative level', () => {
    const element = createTestElement(h, { level: '+2' });
    expect(element.tagName).toBe('H3'); // Assumes default context level of 1
  });

  test('keepTag option', () => {
    const element = createTestElement(h, { keepTag: true, level: 2 });
    expect(element.tagName).toBe('DIV');
    expect(element.getAttribute('aria-level')).toBe('2');
  });

  test('level clamping', () => {
    const element1 = createTestElement(h, { level: 0 });
    expect(element1.tagName).toBe('H1');

    const element2 = createTestElement(h, { level: 7 });
    expect(element2.tagName).toBe('H6');
  });
});

describe('nested sections and headings', () => {
  test('nested sections affect heading levels', () => {
    const { container } = render({
      html: `
        <div use:section>
          <h1 use:h>Level 1</h1>
          <div use:section>
            <h1 use:h>Level 2</h1>
            <div use:section={{ level: "+2" }}>
              <h1 use:h>Level 4</h1>
            </div>
          </div>
        </div>
      `,
    });

    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings[0].tagName).toBe('H1');
    expect(headings[1].tagName).toBe('H2');
    expect(headings[2].tagName).toBe('H4');
  });

  test('relative levels work correctly', () => {
    const { container } = render({
      html: `
        <div use:section={{ level: 3 }}>
          <h1 use:h>Level 3</h1>
          <div use:section={{ level: "+2" }}>
            <h1 use:h>Level 5</h1>
            <h1 use:h={{ level: "-1" }}>Level 4</h1>
          </div>
          <h1 use:h={{ level: "-1" }}>Level 2</h1>
        </div>
      `,
    });

    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings[0].tagName).toBe('H3');
    expect(headings[1].tagName).toBe('H5');
    expect(headings[2].tagName).toBe('H4');
    expect(headings[3].tagName).toBe('H2');
  });
});