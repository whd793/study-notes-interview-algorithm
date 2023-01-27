# Web Accessibility Interview Answer

Web accessibility means building websites that can be used by everyone, including people with disabilities. I approach accessibility as a fundamental part of the development process, not an afterthought.

I follow the WCAG (Web Content Accessibility Guidelines) principles: making content perceivable, operable, understandable, and robust. In practice, this means using semantic HTML elements that clearly describe their purpose, providing text alternatives for non-text content, ensuring sufficient color contrast, making all functionality available from the keyboard, and testing with assistive technologies.

I build accessibility into my workflow by using semantic HTML by default, implementing proper heading hierarchies, adding appropriate ARIA attributes when HTML semantics aren't sufficient, and regularly testing with keyboard navigation and screen readers. I also use automated tools like axe and Lighthouse to catch common issues early in development.

In React applications, I pay special attention to focus management during route changes, handling keyboard interactions for custom components, and ensuring dynamic content updates are announced to screen reader users.