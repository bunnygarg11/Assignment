import React, { useState, useEffect, useRef } from "react";

import LoadingIndicator from "../UI/LoadingIndicator";
import "./ItemsForm.css";

const ItemForm = React.memo(props => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredQuantity, setEnteredQuantity] = useState("");
  const inputRef11 = useRef();
  useEffect(() => {
    inputRef11.current.focus();
  }, []);
  const submitHandler = event => {
    event.preventDefault();
    if (enteredQuantity !== "" && enteredTitle !== "") {
      props.addItem({ title: enteredTitle, quantity: enteredQuantity });
      setEnteredQuantity("")
      setEnteredTitle("")
    } else {
      props.setError();
    }
  };

  return (
    <section className="form">
        <form onSubmit={submitHandler}>
          <div className="subForm">
            <label htmlFor="title">Name</label>
            <input
              ref={inputRef11}
              type="text"
              id="title"
              value={enteredTitle}
              onChange={event => {
                setEnteredTitle(event.target.value);
              }}
            />
          </div>
          <div className="subForm">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={enteredQuantity}
              onChange={event => {
                setEnteredQuantity(event.target.value);
              }}
            />
          </div>
          <div className="actions">
            <button type="submit">Add Item</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
    </section>
  );
});

export default ItemForm;
