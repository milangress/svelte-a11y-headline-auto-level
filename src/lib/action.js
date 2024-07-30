import { getContext, setContext } from 'svelte';

const CONTEXT_KEY = 'svelte-a11y-headline-auto-level';
const TOP_LEVEL_KEY = 'svelte-a11y-headline-top-level';

/**
 * @typedef {Object} SectionOptions
 * @property {number | string} [level]
 * @property {string} [tag]
 */

/**
 * @type {import('svelte/action').Action<HTMLElement, SectionOptions>}
 */
export function section(node, options = {}) {
  const isTopLevel = !getContext(TOP_LEVEL_KEY);
  const parentLevel = isTopLevel ? 0 : (getContext(CONTEXT_KEY) || 0);
  let level = parentLevel + 1;

  // Store the current top level state
  const previousTopLevelState = getContext(TOP_LEVEL_KEY);

  function updateLevel() {
    if (options.level !== undefined) {
      if (typeof options.level === 'string' && options.level.startsWith('+')) {
        level = parentLevel + parseInt(options.level.slice(1));
      } else if (typeof options.level === 'string' && options.level.startsWith('-')) {
        level = parentLevel - parseInt(options.level.slice(1));
      } else {
        level = parseInt(String(options.level));
      }
    }
    level = Math.max(1, Math.min(6, level));
    
    node.setAttribute('data-level', String(level));
    node.setAttribute('data-parent-level', String(parentLevel));
    node.setAttribute('data-top-level', String(isTopLevel));
    
    // Set the new context level for children
    setContext(CONTEXT_KEY, level);
    // Mark that we're no longer at the top level for children of this section
    setContext(TOP_LEVEL_KEY, true);
  }

  updateLevel();

  if (options.tag && node.tagName.toLowerCase() !== options.tag) {
    const newNode = document.createElement(options.tag);
    
    // Copy all attributes, including data and ARIA attributes
    [...node.attributes].forEach(attr => {
      const name = attr.name;
      const value = attr.value;
      if (name.startsWith('data-') || name.startsWith('aria-') || name === 'role') {
        newNode.setAttribute(name, value);
      } else {
        newNode[name] = node[name];
      }
    });
    
    // Ensure id is correctly transferred
    if (node.id) {
      newNode.id = node.id;
    }

    // Copy all properties, including non-standard ones
    for (let key in node) {
      if (!(key in newNode) && typeof node[key] !== 'function') {
        try {
          newNode[key] = node[key];
        } catch (e) {
          // Some properties might not be writable, we can safely ignore these
        }
      }
    }

    // Copy inline event handlers
    const eventAttributes = ['onclick', 'onsubmit', 'onload', /* add more as needed */];
    eventAttributes.forEach(attr => {
      if (node[attr]) newNode[attr] = node[attr];
    });

    // Copy classList
    newNode.className = node.className;

    // Copy style
    newNode.style.cssText = node.style.cssText;


    // Move all child nodes
    newNode.append(...node.childNodes);
    
    // Replace the old node with the new one
    node.replaceWith(newNode);
    
    // Update the node reference
    node = newNode;
  }

  return {
    update(newOptions) {
      options = newOptions;
      updateLevel();
    },
    destroy() {
      // Reset the TOP_LEVEL_KEY to its previous state
      setContext(TOP_LEVEL_KEY, previousTopLevelState);
    }
  };
}

/**
 * @typedef {Object} HeadingOptions
 * @property {number | string} [level]
 * @property {boolean} [keepTag]
 */

/**
 * @type {import('svelte/action').Action<HTMLElement, HeadingOptions>}
 */
export function h(node, options = {}) {
  const contextLevel = getContext(CONTEXT_KEY) || 1;
  let headingLevel = contextLevel;

  function calculateHeadingLevel(level, baseLevel) {
    if (typeof level === 'string') {
      if (level.startsWith('+')) {
        return baseLevel + parseInt(level.slice(1), 10);
      } else if (level.startsWith('-')) {
        return baseLevel - parseInt(level.slice(1), 10);
      } else {
        return parseInt(level, 10);
      }
    } else if (typeof level === 'number') {
      return level;
    }
    return baseLevel;
  }

  headingLevel = calculateHeadingLevel(options.level, contextLevel);
  headingLevel = Math.max(1, Math.min(6, headingLevel));

  if (!options.keepTag) {
    const newNode = document.createElement(`h${headingLevel}`);
    
    // Copy all attributes, including data and ARIA attributes
    [...node.attributes].forEach(attr => {
      const name = attr.name;
      const value = attr.value;
      if (name.startsWith('data-') || name.startsWith('aria-') || name === 'role') {
        newNode.setAttribute(name, value);
      } else {
        newNode[name] = node[name];
      }
    });
    
    // Ensure id is correctly transferred
    if (node.id) {
      newNode.id = node.id;
    }

    // Copy all properties, including non-standard ones
    for (let key in node) {
      if (!(key in newNode) && typeof node[key] !== 'function') {
        try {
          newNode[key] = node[key];
        } catch (e) {
          // Some properties might not be writable, we can safely ignore these
        }
      }
    }

    // Copy inline event handlers
    const eventAttributes = ['onclick', 'onsubmit', 'onload', /* add more as needed */];
    eventAttributes.forEach(attr => {
      if (node[attr]) newNode[attr] = node[attr];
    });

    // Copy classList
    newNode.className = node.className;

    // Copy style
    newNode.style.cssText = node.style.cssText;

    // Move all child nodes
    newNode.append(...node.childNodes);
    
    // Replace the old node with the new one
    node.replaceWith(newNode);
    
    // Update the node reference
    node = newNode;
  }

  node.setAttribute('aria-level', String(headingLevel));
  

  return {
    update(newOptions) {
      options = newOptions;
      const currentContextLevel = getContext(CONTEXT_KEY) || 1;
      let newHeadingLevel = calculateHeadingLevel(newOptions.level, currentContextLevel);
      newHeadingLevel = Math.max(1, Math.min(6, newHeadingLevel));
      
      node.setAttribute('aria-level', String(newHeadingLevel));
      if (!options.keepTag) {
        const newTag = `h${newHeadingLevel}`;
        if (node.tagName.toLowerCase() !== newTag) {
          const newNode = document.createElement(newTag);
          // ... copy attributes and children ...
          node.replaceWith(newNode);
          node = newNode;
        }
      }
    },
    destroy() {
      // Cleanup if necessary
    }
  };
}