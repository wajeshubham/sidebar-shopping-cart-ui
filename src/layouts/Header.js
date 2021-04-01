import React from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { LockFill } from "react-bootstrap-icons";
import logo from "../assets/logo.png";
import styles from "../scss/header.module.scss";

const Header = ({ onToggle, cartLength, isCheckingOut }) => {
  return (
    <>
      <Navbar className={styles.header}>
        <Container fluid style={{ position: "relative" }}>
          <Navbar.Brand href="/" style={{ fontWeight: "bolder" }}>
            <Image src={logo} width="150px" />
          </Navbar.Brand>
          {isCheckingOut ? (
            <Nav.Link disabled={true}>
              <span
                className="ml-auto text-secondary"
                style={{
                  fontSize: "18px",
                  color: "black",
                  position: "relative",
                }}
              >
                Pay securely{" "}
                <LockFill
                  className="mb-1"
                  size="20"
                  style={{ verticalAlign: "middle" }}
                />
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
          ) : (
            <Nav.Link style={{ textDecoration: "none" }} onClick={onToggle}>
              <span
                className="ml-auto font-weight-bolder"
                style={{
                  fontSize: "18px",
                  color: "black",
                  position: "relative",
                }}
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
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
