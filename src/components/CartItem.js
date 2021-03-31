import React from "react";
import { Col, Row, Card } from "react-bootstrap";

import styles from "../scss/cart_item.module.scss";
import QuantityBtn from "./QuantityBtn";

const CartItem = ({
  product,
  handleIncrement,
  handleDecrement,
  handleRemoval,
}) => {
  return (
    <React.Fragment key={product.id}>
      <Row style={{ display: "flex", flexDirection: "row" }}>
        <Col className={styles.img_col} lg={5}>
          <Card.Img className={styles.prod_img} src={product.src?.large2x} />
        </Col>
        <Col
          className={styles.content_col}
          style={{ borderRadius: "none" }}
          lg={7}
        >
          <Col md={12}>
            <span className={styles.product_name}>{product.name}</span>
          </Col>

          <Col className={styles.qty_btn_col} md={12}>
            <QuantityBtn
              quantity={product.quantity}
              onIncrement={() => handleIncrement(product.id)}
              onDecrement={() => handleDecrement(product.id)}
              handleRemoval={() => handleRemoval(product.id)}
            />
          </Col>

          <Col md={12}>
            <span style={{ fontSize: "20px" }}>₹</span>
            <span style={{ fontSize: "20px", fontWeight: "bolder" }}>
              {parseInt(product.price.replace(/,/g, "")) * product.quantity}
            </span>
          </Col>
        </Col>
      </Row>
      <hr className={styles.seperator}></hr>
    </React.Fragment>
  );
};

export default CartItem;
