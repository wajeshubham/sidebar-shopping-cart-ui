import React from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../scss/header.module.scss";

const Header = ({ onToggle, cartLength }) => {
  return (
    <>
      <Navbar className={styles.header}>
        <Container style={{ position: "relative" }}>
          <Navbar.Brand href="#home" style={{ fontWeight: "bolder" }}>
            <Image src={logo} width="150px" />
          </Navbar.Brand>
          <Nav.Link style={{ textDecoration: "none" }} onClick={onToggle}>
            <span
              className="ml-auto font-weight-bolder"
              style={{ fontSize: "18px", color: "black", position: "relative" }}
            >
              Cart
              <sub
                className={styles.cart_items_count}
                style={{
                  display: cartLength > 0 ? "" : "none",
                }}
              >
                {cartLength}
              </sub>
            </span>
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
