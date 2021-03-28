import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AddNewProductForm from "../components/AddNewProductForm";

import { dummyProducts } from "./dummyProducts";

const onSubmit = jest.fn();
const displayMessageMock = jest.fn();

const displayMessage = () => {};

const setAllProducts = () => {};

describe("AddNewProductForm", () => {
  it("should have product name input working", () => {
    const component = render(
      <AddNewProductForm
        show={true}
        setAllProducts={setAllProducts}
        allProducts={dummyProducts}
        displayMessage={displayMessage}
      />
    );
    const productNameInput = component.getByTestId("test-product-name-input");

    fireEvent.change(productNameInput, { target: { value: "Good Day" } });
    expect(productNameInput.value).toEqual("Good Day");
  });

  it("should print helper text if users type string that is already existed on product name field", () => {
    const component = render(
      <AddNewProductForm
        show={true}
        setAllProducts={setAllProducts}
        allProducts={dummyProducts}
        displayMessage={displayMessage}
      />
    );
    const productNameInput = component.getByTestId("test-product-name-input");

    fireEvent.change(productNameInput, { target: { value: "Oreo" } });

    expect(productNameInput.value).toEqual("Oreo");

    const productNameInputWrapper = component.getByTestId(
      "test-product-name-input-wrapper"
    );

    expect(productNameInputWrapper.textContent).toEqual(
      "Product name is already existed!"
    );
  });

  it("should not create new product if product name is already existed", async () => {
    const component = render(
      <AddNewProductForm
        show={true}
        setAllProducts={setAllProducts}
        allProducts={dummyProducts}
        displayMessage={displayMessageMock}
        onSubmit={onSubmit}
      />
    );

    const productNameInput = component.getByTestId("test-product-name-input");
    const priceInput = component.getByTestId("test-price-input");
    const quantityInput = component.getByTestId("test-quantity-input");
    const brandInput = component.getByTestId("test-brand-input");
    const categoryInput = component.getByTestId("test-category-input");
    const unitInput = component.getByTestId("test-unit-input");

    fireEvent.change(productNameInput, {
      target: { value: "Oreo" },
    });
    fireEvent.change(priceInput, { target: { value: 8 } });
    fireEvent.change(quantityInput, { target: { value: 8 } });
    fireEvent.change(brandInput, { target: { value: "Oreo" } });
    fireEvent.change(categoryInput, { target: { value: "cookies" } });
    fireEvent.change(unitInput, { target: { value: "170g" } });

    const addButton = component.getByTestId("test-add-button");
    expect(displayMessageMock).toHaveBeenCalledTimes(0);
    fireEvent.submit(addButton);

    await waitFor(() => expect(displayMessageMock).toHaveBeenCalledTimes(1));
  });

  it("should create new product if all fields are filled", async () => {
    const component = render(
      <AddNewProductForm
        show={true}
        setAllProducts={setAllProducts}
        allProducts={dummyProducts}
        displayMessage={displayMessageMock}
        onSubmit={onSubmit}
      />
    );

    const productNameInput = component.getByTestId("test-product-name-input");
    const priceInput = component.getByTestId("test-price-input");
    const quantityInput = component.getByTestId("test-quantity-input");
    const brandInput = component.getByTestId("test-brand-input");
    const categoryInput = component.getByTestId("test-category-input");
    const unitInput = component.getByTestId("test-unit-input");

    fireEvent.change(productNameInput, {
      target: { value: "Cookiessss" },
    });
    fireEvent.change(priceInput, { target: { value: 8 } });
    fireEvent.change(quantityInput, { target: { value: 8 } });
    fireEvent.change(brandInput, { target: { value: "Oreo" } });
    fireEvent.change(categoryInput, { target: { value: "cookies" } });
    fireEvent.change(unitInput, { target: { value: "170g" } });

    const addButton = component.getByTestId("test-add-button");
    expect(displayMessageMock).toHaveBeenCalledTimes(0);
    fireEvent.submit(addButton);

    await waitFor(() => expect(displayMessageMock).toHaveBeenCalledTimes(1));
  });
});
