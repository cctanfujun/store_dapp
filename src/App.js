import React, { Component } from "react";
import "./App.css";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./component/Home.js";
import Find from "./component/Find.js";
import Nrank from "./component/Nrank.js";
import Nas from "./component/Nas.js";
import About from "./component/About.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">星云榜单</a>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                <NavItem eventKey={1} href="/">
                  排行榜
                </NavItem>
                <NavItem eventKey={2} href="/add">
                  发现
                </NavItem>
                <NavItem eventKey={2} href="/nrank">
                  兑换NRANK
                </NavItem>
                <NavItem eventKey={2} href="/nas">
                  兑换Nas
                </NavItem>
                <NavItem eventKey={2} href="/about">
                  关于
                </NavItem>
              </Nav>
            </Navbar>
            <Route exact path="/" component={Home} />
            <Route path="/add" component={Find} />
            <Route path="/nrank" component={Nrank} />
            <Route path="/nas" component={Nas} />
            <Route path="/about" component={About} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
