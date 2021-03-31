import React from "react";
import { Col, Row, Card } from "react-bootstrap";

import styles from "../scss/product.module.scss";

const Product = ({ product, handleAddToCart }) => {
  return (
    <Row className={styles.product_row}>
      <Col lg={12}>
        <Card.Img className={styles.prod_img} src={product.src?.large2x} />
      </Col>
      <Col style={{ borderRadius: "none" }} lg={12}>
        <Col md={12}>
          <span className={styles.product_name}>{product.name}</span>
        </Col>

        <Col md={12}>
          <span style={{ fontSize: "20px" }}>₹{product.price}</span>
        </Col>
        <Col className={styles.add_to_cart_btn_col} md={12}>
          <button
            className={styles.add_to_cart_btn}
            onClick={() => {
              handleAddToCart(product);
            }}
          >
            Add to Cart
          </button>
        </Col>
      </Col>
    </Row>
  );
};

export default Product;
