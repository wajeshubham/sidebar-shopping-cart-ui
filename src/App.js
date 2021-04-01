import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/checkout" exact component={Checkout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
