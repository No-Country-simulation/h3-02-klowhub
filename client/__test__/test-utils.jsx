import { render } from '@testing-library/react';
import fs from 'node:fs';

//Use if you need to wrap your component with some provider
const AllTheProviders = ({ children }) => {
  return <>{children}</>;
};

const customRender = (ui, options) => {
  const view = render(ui, { wrapper: AllTheProviders, ...options });

  // By default you cannot use classes in the Jest environment.
  // This way you add all your classes to be able to use them
  // For Update test-globals-css: npx tailwindcss -i ./src/styles/globals.css -o ./__test__/styles/globals.css
  const stylePath = path.resolve('./app/globals.css');
  if (fs.existsSync(stylePath)) {
    const style = document.createElement('style');
    style.innerHTML = fs.readFileSync(stylePath, 'utf8');
    document.head.appendChild(style);
  }

  return view;
};

/*
Instead of importing "@testing-library/react" directly into your tests, import "test-utils" if you need to add a provider or add some more utility
*/
// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
