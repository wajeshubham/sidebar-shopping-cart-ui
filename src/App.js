import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./layouts/Header";
import axios from "axios";
import Product from "./components/Product";
import SliderCart from "./components/SliderCart";
import { Col, Row } from "react-bootstrap";
import styles from "./scss/app.module.scss";
import CustomSpinner from "./components/CustomSpinner";

function App() {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://jsonware.com/json/a6b935596fa215c28180d41a88b6e6ee.json"
      );
      setAvailableProducts(res.data.photos);
      setIsLoading(false);
    } catch (error) {
      console.error("axios error-->", error);
      setIsLoading(false);
    }
  };

  const onToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const handleRemoval = (id) => {
    setProductsInCart([
      ...productsInCart.filter((prod) => {
        return prod.id !== id;
      }),
    ]);
  };

  const handleAddToCart = (product) => {
    let found = productsInCart.some((element) => element.id === product.id);
    if (found) {
      handleIncrement(product.id);
      setToggleSidebar(true);
    } else {
      setProductsInCart([...productsInCart, product]);
      setToggleSidebar(true);
    }
  };

  const handleIncrement = (id) => {
    setProductsInCart([
      ...productsInCart.map((prod) => {
        if (prod.id === id) {
          prod.quantity += 1;
        }
        return prod;
      }),
    ]);
  };

  const handleDecrement = (id) => {
    setProductsInCart([
      ...productsInCart.map((prod) => {
        if (prod.id === id) {
          prod.quantity -= 1;
        }
        return prod;
      }),
    ]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header
        toggleSidebar={toggleSidebar}
        cartLength={productsInCart.length}
        onToggle={onToggle}
      />
      <div className={styles.main_container}>
        <SliderCart
          isOpen={toggleSidebar}
          onToggle={onToggle}
          handleRemoval={handleRemoval}
          handleAddToCart={handleAddToCart}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          productsInCart={productsInCart}
          availableProducts={availableProducts}
          isLoading={isLoading}
        />
        {!isLoading ? (
          <Row className={styles.products_container}>
            {!isLoading &&
              availableProducts.map((prod) => (
                <>
                  <Col className="mb-5" lg={3}>
                    <Product product={prod} handleAddToCart={handleAddToCart} />
                  </Col>
                </>
              ))}
          </Row>
        ) : (
          <CustomSpinner />
        )}
      </div>
    </>
  );
}

export default App;
