import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import SliderCart from "../components/SliderCart";
import { Col, Row } from "react-bootstrap";
import styles from "../scss/home.module.scss";
import CustomSpinner from "../components/CustomSpinner";
import Layout from "../layouts/Layout";

function Home() {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setCartInLocalhost = async (cartProducts) => {
    await localStorage.setItem("cart", JSON.stringify(cartProducts));
  };

  const getCartFromLocalhost = async () => {
    const cart = await JSON.parse(localStorage.getItem("cart"));
    if (cart) return cart;
    return [];
  };

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://jsonware.com/json/a6b935596fa215c28180d41a88b6e6ee.json"
      );
      const cartItems = await getCartFromLocalhost();
      setProductsInCart(cartItems);
      setAvailableProducts(res.data.photos);
      setIsLoading(false);
    } catch (error) {
      console.error("axios error-->", error);
      setIsLoading(false);
    }
  }, []);

  const onToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const handleRemoval = (id) => {
    let cart = productsInCart.filter((prod) => {
      return prod.id !== id;
    });
    setProductsInCart(cart);
    setCartInLocalhost(cart);
  };

  const handleAddToCart = (product) => {
    let found = productsInCart.some((element) => element.id === product.id);
    let cart = productsInCart;
    if (found) {
      handleIncrement(product.id);
      setToggleSidebar(true);
    } else {
      setProductsInCart([...productsInCart, product]);
      setToggleSidebar(true);
      cart.push(product);
    }

    setCartInLocalhost(productsInCart);
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
    setCartInLocalhost(productsInCart);
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
    setCartInLocalhost(productsInCart);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Layout
        toggleSidebar={toggleSidebar}
        cartLength={productsInCart.length}
        onToggle={onToggle}
      >
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
                      <Product
                        product={prod}
                        handleAddToCart={handleAddToCart}
                      />
                    </Col>
                  </>
                ))}
            </Row>
          ) : (
            <CustomSpinner />
          )}
        </div>
      </Layout>
    </>
  );
}

export default Home;
