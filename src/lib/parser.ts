import React from 'react';

type ComponentMap = { [key: string]: React.ComponentType<any> };

const simpleJsxParser = (jsxString: string, components: ComponentMap = {}): React.ReactNode => {
  const parseAttributes = (attrString: string): { [key: string]: string } => {
    const attrs: { [key: string]: string } = {};
    attrString.split(' ').forEach(attr => {
      const [key, value] = attr.split('=');
      if (key && value) {
        attrs[key] = value.replace(/['"]/g, '');
      }
    });
    return attrs;
  };

  const parseJsx = (jsx: string): React.ReactNode => {
    const elementRegex = /<(\w+)([^>]*)>([\s\S]*?)<\/\1>|<(\w+)([^>]*)\s*\/>/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = elementRegex.exec(jsx)) !== null) {
      if (match.index > lastIndex) {
        parts.push(jsx.slice(lastIndex, match.index));
      }

      const [fullMatch, tag, attributes, children, voidTag, voidAttributes] = match;
      const componentName = tag || voidTag;
      const Component = components[componentName] || componentName.toLowerCase();
      const props = parseAttributes(attributes || voidAttributes || '');

      if (children) {
        parts.push(React.createElement(
          Component,
          props,
          parseJsx(children)
        ));
      } else {
        parts.push(React.createElement(Component, props));
      }

      lastIndex = match.index + fullMatch.length;
    }

    if (lastIndex < jsx.length) {
      parts.push(jsx.slice(lastIndex));
    }

    return parts.length === 1 ? parts[0] : parts;
  };

  return parseJsx(jsxString);
};

export default simpleJsxParser;