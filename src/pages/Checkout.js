import React, { useEffect, useState } from "react";
import { Col, Form, ListGroup, Row, Image } from "react-bootstrap";
import {
  CheckCircleFill,
  CheckSquareFill,
  Circle,
  Square,
} from "react-bootstrap-icons";
import Layout from "../layouts/Layout";
import styles from "../scss/checkout.module.scss";
import CustomSpinner from "../components/CustomSpinner";
import { useHistory } from "react-router";
const Checkout = () => {
  const history = useHistory();
  const [isBillingAddressSame, setIsBillingAddressSame] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [productsInCart, setProductsInCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    pinCode: "",
    addressLine: "",
    city: "",
    state: "",
    phone: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    billingFirstName: "",
    billingLastName: "",
    billingPinCode: "",
    billingAddressLine: "",
    billingCity: "",
    billingState: "",
    billingPhone: "",
  });

  const [payWithCard, setPayWithCard] = useState(true);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  const {
    firstName,
    lastName,
    pinCode,
    addressLine,
    city,
    state,
    phone,
  } = shippingAddress;

  const {
    billingFirstName,
    billingLastName,
    billingPinCode,
    billingAddressLine,
    billingCity,
    billingState,
    billingPhone,
  } = billingAddress;

  const handleShippingAddressChange = (name) => (event) => {
    setShippingAddress({
      ...shippingAddress,
      [name]: event.target.value,
    });
  };

  const handleBillingAddressChange = (name) => (event) => {
    setBillingAddress({
      ...billingAddress,
      [name]: event.target.value,
    });
  };

  const getCartFromLocalhost = async () => {
    const cart = await JSON.parse(localStorage.getItem("cart"));
    if (cart) return cart;
    return [];
  };

  const shippingAddressForm = () => {
    return (
      <React.Fragment className={styles.shipping_address_form}>
        <Col xs={12}>
          <Form.Label style={{ fontSize: "22px", fontWeight: "900" }}>
            Shipping Address
          </Form.Label>
        </Col>
        <Col className="pr-2 pb-3" xs={6}>
          <Form.Control
            id="first_name"
            placeholder="First Name"
            style={{ fontSize: "20px" }}
            className="py-4"
            value={firstName}
            onChange={handleShippingAddressChange("firstName")}
            required={true}
          />
        </Col>
        <Col className="pl-2 pb-3" xs={6}>
          <Form.Control
            id="last_name"
            placeholder="Last Name"
            style={{ fontSize: "20px" }}
            className="py-4"
            value={lastName}
            onChange={handleShippingAddressChange("lastName")}
            required={true}
          />
        </Col>
        <Col className="pb-3" xs={12}>
          <Form.Control
            id="pin_code"
            placeholder="Pin Code"
            style={{ fontSize: "20px" }}
            className="py-4"
            value={pinCode}
            onChange={handleShippingAddressChange("pinCode")}
            required={true}
          />
        </Col>
        <Col className="pb-3" xs={12}>
          <Form.Control
            id="address"
            placeholder="House Number and street name"
            style={{ fontSize: "20px" }}
            className="py-4"
            value={addressLine}
            onChange={handleShippingAddressChange("addressLine")}
            required={true}
          />
        </Col>
        <Col className="pr-2 pb-3" xs={6}>
          <Form.Control
            id="city"
            placeholder="Town/City"
            style={{ fontSize: "20px" }}
            className="py-4"
            value={city}
            onChange={handleShippingAddressChange("city")}
            required={true}
          />
        </Col>
        <Col className="pl-2 pb-3" xs={6}>
          <Form.Control
            id="state"
            placeholder="State"
            style={{ fontSize: "20px" }}
            className="py-4"
            value={state}
            onChange={handleShippingAddressChange("state")}
            required={true}
          />
        </Col>
        <Col className="pb-3" xs={12}>
          <Form.Control
            id="phone"
            placeholder="Phone"
            style={{ fontSize: "20px" }}
            className="py-4"
            value={phone}
            onChange={handleShippingAddressChange("phone")}
            required={true}
          />
        </Col>
      </React.Fragment>
    );
  };

  const BillingAddressForm = () => {
    return (
      <>
        <Form.Label
          className="mt-2"
          style={{ fontSize: "22px", fontWeight: "900" }}
        >
          Billing Address
        </Form.Label>
        <Row>
          <Col className="pr-2 pb-3" xs={6}>
            <Form.Control
              id="billing_first_name"
              placeholder="First Name"
              style={{ fontSize: "20px" }}
              className="py-4"
              value={billingFirstName}
              onChange={handleBillingAddressChange("billingFirstName")}
              required={true}
            />
          </Col>
          <Col className="pl-2 pb-3" xs={6}>
            <Form.Control
              id="billing_last_name"
              placeholder="Last Name"
              style={{ fontSize: "20px" }}
              className="py-4"
              value={billingLastName}
              onChange={handleBillingAddressChange("billingLastName")}
              required={true}
            />
          </Col>
          <Col className="pb-3" xs={12}>
            <Form.Control
              id="billing_pin_code"
              placeholder="Pin Code"
              style={{ fontSize: "20px" }}
              className="py-4"
              value={billingPinCode}
              onChange={handleBillingAddressChange("billingPinCode")}
              required={true}
            />
          </Col>
          <Col className="pb-3" xs={12}>
            <Form.Control
              id="billing_address"
              placeholder="House Number and street name"
              style={{ fontSize: "20px" }}
              className="py-4"
              value={billingAddressLine}
              onChange={handleBillingAddressChange("billingAddressLine")}
              required={true}
            />
          </Col>
          <Col className="pr-2 pb-3" xs={6}>
            <Form.Control
              id="billing_city"
              placeholder="Town/City"
              style={{ fontSize: "20px" }}
              className="py-4"
              value={billingCity}
              onChange={handleBillingAddressChange("billingCity")}
              required={true}
            />
          </Col>
          <Col className="pl-2 pb-3" xs={6}>
            <Form.Control
              id="billing_state"
              placeholder="State"
              style={{ fontSize: "20px" }}
              className="py-4"
              value={billingState}
              onChange={handleBillingAddressChange("billingState")}
              required={true}
            />
          </Col>
          <Col className="pb-3" xs={12}>
            <Form.Control
              id="billing_phone"
              placeholder="Phone"
              style={{ fontSize: "20px" }}
              className="py-4"
              value={billingPhone}
              onChange={handleBillingAddressChange("billingPhone")}
              required={true}
            />
          </Col>
        </Row>
      </>
    );
  };

  const CheckoutForm = () => {
    return (
      <>
        <div className="mb-4">
          <Form.Label
            htmlFor="email"
            style={{ fontSize: "22px", fontWeight: "900" }}
          >
            Contact Information
          </Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="Email"
            style={{ fontSize: "20px" }}
            className="py-4"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required={true}
          />
        </div>

        <Row>
          {shippingAddressForm()}
          <Col xs={12}>
            {isBillingAddressSame ? (
              <CheckSquareFill
                size={20}
                onClick={() => setIsBillingAddressSame(!isBillingAddressSame)}
              />
            ) : (
              <Square
                size={20}
                onClick={() => setIsBillingAddressSame(!isBillingAddressSame)}
              />
            )}

            <span
              className="ml-2"
              style={{
                fontSize: "17px",
                verticalAlign: "middle",
                fontWeight: "600",
              }}
            >
              Billing address same as shipping address
            </span>
          </Col>
          {isBillingAddressSame ? null : (
            <Col xs={12}>{BillingAddressForm()}</Col>
          )}
          <Col className="mt-2" xs={12}>
            <Form.Label style={{ fontSize: "22px", fontWeight: "900" }}>
              Select Payment
            </Form.Label>
          </Col>

          <Col xs={12}>
            <ListGroup>
              <ListGroup.Item
                className="mb-2 px-3"
                style={{ borderRadius: "5px" }}
              >
                <Col className="px-0" xs={12}>
                  {payWithCard ? (
                    <CheckCircleFill
                      size={20}
                      onClick={() => {
                        setCashOnDelivery(false);
                      }}
                    />
                  ) : (
                    <Circle
                      size={20}
                      onClick={() => {
                        setPayWithCard(!payWithCard);
                        setCashOnDelivery(false);
                      }}
                    />
                  )}

                  <span
                    className="ml-2"
                    style={{
                      fontSize: "17px",
                      verticalAlign: "middle",
                      fontWeight: "600",
                    }}
                  >
                    Credit / Debit / NetBanking / UPI
                  </span>
                </Col>
              </ListGroup.Item>
              <ListGroup.Item className="px-3" style={{ borderRadius: "5px" }}>
                <Col className="px-0" xs={12}>
                  {cashOnDelivery ? (
                    <CheckCircleFill
                      size={20}
                      onClick={() => {
                        setPayWithCard(false);
                      }}
                    />
                  ) : (
                    <Circle
                      size={20}
                      onClick={() => {
                        setPayWithCard(false);
                        setCashOnDelivery(!cashOnDelivery);
                      }}
                    />
                  )}
                  <span
                    className="ml-2"
                    style={{
                      fontSize: "17px",
                      verticalAlign: "middle",
                      fontWeight: "600",
                    }}
                  >
                    Cash on Delivery
                  </span>
                </Col>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={12}>
            <button className={styles.payment_btn} type="submit">
              CONFIRM & PAY
            </button>
          </Col>
        </Row>
      </>
    );
  };

  const OrderSummery = () => {
    return (
      <>
        <Form.Label style={{ fontSize: "22px", fontWeight: "900" }}>
          Order Summery
        </Form.Label>
        {productsInCart.map((product, i) => (
          <>
            <Row className={styles.checkout_products_row}>
              <Col className={styles.checkout_product_img_col} lg={3}>
                <Image className={styles.prod_img} src={product.src?.large2x} />
              </Col>
              <Col
                className={styles.checkout_product_name_col}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  fontSize: "20px",
                  fontWeight: "bolder",
                }}
                lg={6}
              >
                <span>{product.name}</span>
              </Col>
              <Col
                className={styles.checkout_product_price_col}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  fontSize: "20px",
                  fontWeight: "bolder",
                }}
                lg={3}
              >
                <span>
                  ₹
                  {parseInt(product.price.replace(/,/g, "")) * product.quantity}
                </span>
              </Col>
            </Row>
            <hr className="my-3" style={{ backgroundColor: "#bbbbbb" }}></hr>
          </>
        ))}
        <Row>
          <Col className={styles.coupon_code_input_col} lg={9}>
            <Form.Control
              className="py-4"
              placeholder="Coupon Code"
              style={{ fontSize: "20px" }}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </Col>
          <Col className={styles.coupon_code_button_col} lg={3}>
            <button
              className={styles.apply_btn}
              style={{
                backgroundColor: couponCode.length > 0 ? "black" : "#999999",
              }}
              type="button"
              disabled={couponCode.length > 0 ? false : true}
            >
              APPLY
            </button>
          </Col>
        </Row>

        <hr className="my-3" style={{ backgroundColor: "#bbbbbb" }}></hr>
        <Row style={{ fontSize: "21px" }}>
          <Col className={styles.subtotal_col_left} lg={6}>
            <span>Subtotal</span>
          </Col>
          <Col className={styles.subtotal_col_right} lg={6}>
            <span className="float-right">₹{subTotal}</span>
          </Col>
        </Row>
        <Row style={{ fontSize: "21px" }}>
          <Col className={styles.shipping_charges_col_left} lg={6}>
            <span>Shipping</span>
          </Col>
          <Col className={styles.shipping_charges_col_right} lg={6}>
            <span className="float-right">FREE</span>
          </Col>
        </Row>
        <hr className="my-3" style={{ backgroundColor: "#bbbbbb" }}></hr>
        <Row style={{ fontSize: "21px", fontWeight: "bolder" }}>
          <Col className={styles.grand_total_col_left} lg={9}>
            <span>Total</span>
          </Col>
          <Col className={styles.grand_total_col_right} lg={3}>
            <span className="float-right">₹{grandTotal}</span>
          </Col>
        </Row>
        <hr className="my-3" style={{ backgroundColor: "#bbbbbb" }}></hr>
      </>
    );
  };

  const populateCart = async () => {
    try {
      const cartItems = await getCartFromLocalhost();
      if (cartItems.length === 0) {
        history.push("/");
      }
      let total = 0;
      cartItems.map((item) => {
        total += parseInt(item.price.replace(/,/g, "")) * item.quantity;
      });
      setGrandTotal(shippingCharges + total);
      setSubTotal(total);
      setProductsInCart(cartItems);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const formValidation = async () => {
    const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!emailRegEx.test(String(contactEmail).toLowerCase())) {
      console.log(contactEmail);
      return false;
    }

    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    let isFormValid = await formValidation();
    if (isFormValid) {
      console.log(isBillingAddressSame);
      console.log(contactEmail);
      console.log(shippingAddress);
      console.log(billingAddress);
      console.log(payWithCard);
      console.log(cashOnDelivery);
    } else {
      console.log("Email is invalid");
    }
  };

  useEffect(() => {
    populateCart();
  }, []);

  return (
    <Layout isCheckingOut={true}>
      {!isLoading ? (
        <Row className={styles.main_container}>
          <Col
            className={styles.contact_col}
            md={6}
            style={{ borderRight: "1px solid #cccccc" }}
          >
            <Form onSubmit={handlePayment}>{CheckoutForm()}</Form>
          </Col>
          <Col className={styles.order_col} md={6}>
            {OrderSummery()}
          </Col>
        </Row>
      ) : (
        <CustomSpinner />
      )}
    </Layout>
  );
};

export default Checkout;
