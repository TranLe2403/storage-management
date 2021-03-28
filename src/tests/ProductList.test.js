import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ProductList from "../components/ProductList";
import { dummyProducts } from "./dummyProducts";
import { matchers } from "@emotion/jest";

const displayMessage = () => {};

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

describe("Responsive product list", () => {
  it("should display 1 column if screen size is less than 768px", () => {
    window = Object.assign(window, { innerWidth: 700 });
    const component = render(
      <ProductList
        show={true}
        allProducts={dummyProducts}
        displayMessage={displayMessage}
      />
    );
    const allItems = component.getByTestId("test-all-products");

    expect(allItems).toHaveStyleRule("grid-template-columns", "repeat(1, 1fr)");
  });

  it("should display 2 columns if screen size is less than 1280px and more than 768px", () => {
    window = Object.assign(window, { innerWidth: 1000 });
    const component = render(
      <ProductList
        show={true}
        allProducts={dummyProducts}
        displayMessage={displayMessage}
      />
    );

    const allItems = component.getByTestId("test-all-products");

    expect(allItems).toHaveStyleRule("grid-template-columns", "repeat(2, 1fr)");
  });

  it("should display 3 columns if screen size is more than 1280px", () => {
    window = Object.assign(window, { innerWidth: 1300 });
    const component = render(
      <ProductList
        show={true}
        allProducts={dummyProducts}
        displayMessage={displayMessage}
      />
    );
    const allItems = component.getByTestId("test-all-products");

    expect(allItems).toHaveStyleRule("grid-template-columns", "repeat(3, 1fr)");
  });
});
