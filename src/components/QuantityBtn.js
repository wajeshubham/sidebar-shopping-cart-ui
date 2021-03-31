import React from "react";
import styles from "../scss/quantity_btn.module.scss";

function QuantityBtn({ onIncrement, onDecrement, quantity, handleRemoval }) {
  return (
    <>
      <span className={styles.increase_qty} onClick={onIncrement}>
        +
      </span>
      <span className={styles.quantity}>
        {quantity > 1 ? `${quantity} Boxes` : `${quantity} Box`}{" "}
      </span>
      <span
        className={styles.decrease_qty}
        onClick={quantity > 1 ? onDecrement : handleRemoval}
      >
        -
      </span>
    </>
  );
}

export default QuantityBtn;
