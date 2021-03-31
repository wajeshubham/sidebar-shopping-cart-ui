import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import styles from "../scss/slider_cart.module.scss";
import CartItem from "./CartItem";
import CustomSpinner from "./CustomSpinner";
import Product from "./Product";

const SliderCart = ({
  availableProducts,
  productsInCart,
  isOpen,
  onToggle,
  handleRemoval,
  handleAddToCart,
  handleIncrement,
  handleDecrement,
  isLoading,
}) => {
  return (
    <div
      className={styles.sidebar}
      style={{
        transform: isOpen ? "translate(0%, 0%)" : "translate(120%, 0%)",
        webkitTransform: isOpen ? "translate(0%, 0%)" : "translate(120%, 0%)",
        opacity: isOpen ? 1 : 0.5,
      }}
    >
      <nav className={styles.slider_nav}>
        <span>
          <ArrowLeft
            className={styles.slider_nav_closing_arrow}
            size={30}
            onClick={onToggle}
          />
        </span>
        <span
          style={{ fontSize: "30px", fontWeight: "bolder", marginTop: "-8px" }}
        >
          Cart
        </span>
        <span className={styles.slider_nav_product_count}>
          {productsInCart.length > 1
            ? `${productsInCart.length} items`
            : `${productsInCart.length} item`}
        </span>
      </nav>
      {!isLoading ? (
        <>
          {productsInCart.length > 0 ? (
            <>
              <section className={styles.slider_cart_section}>
                {productsInCart.map((product, i) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    handleRemoval={handleRemoval}
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                  />
                ))}
              </section>
              <section className="p-3">
                <button
                  className="py-2 mb-3 btn btn-block"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <span style={{ fontSize: "18px", fontWeight: "bolder" }}>
                    CHECKOUT
                  </span>
                </button>
                <button
                  className="py-2 btn btn-block"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid grey",
                  }}
                  onClick={onToggle}
                >
                  <span style={{ fontSize: "18px", fontWeight: "bolder" }}>
                    CONTINUE SHOPPING
                  </span>
                </button>
              </section>
            </>
          ) : (
            <Row className={styles.cart_empty_msg}>
              <Col lg={12}>
                {" "}
                <p>This cart is empty inside.</p>
              </Col>
              <Col lg={12}>
                <Button
                  style={{
                    width: "70%",
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: "bolder",
                    border: "none",
                  }}
                  onClick={onToggle}
                >
                  RETURN TO SHOP
                </Button>
              </Col>
            </Row>
          )}
          <div className="text-center">
            <span style={{ fontSize: "25px", fontWeight: "bolder" }}>
              Quickly add from here
            </span>
            <hr
              className="my-1"
              style={{
                backgroundColor: "#aaaaaa",
                margin: "0.5rem 1rem 0.5rem 1rem",
              }}
            ></hr>
          </div>
          <div className={styles.slider_products_suggession}>
            {availableProducts.map((product, i) => (
              <>
                <Product product={product} handleAddToCart={handleAddToCart} />
              </>
            ))}
          </div>
        </>
      ) : (
        <CustomSpinner />
      )}
    </div>
  );
};

export default SliderCart;
