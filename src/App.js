import React, { Component } from "react";
import "./App.css";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import {
  Button,
  Header,
  Segment,
  TransitionablePortal
} from "semantic-ui-react";
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
                <TransitionablePortalExamplePortal />
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
        <br />
        <Footer />
      </div>
    );
  }
}

class TransitionablePortalExamplePortal extends Component {
  state = { open: false };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <TransitionablePortal
        closeOnTriggerClick
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        openOnTriggerClick
        trigger={<NavItem>当前 Nrank 数量</NavItem>}
      >
        <Segment
          style={{ left: "80%", position: "fixed", top: "5%", zIndex: 1000 }}
        >
          <Header>当前 Nrank 数量</Header>
          <p>1000</p>
        </Segment>
      </TransitionablePortal>
    );
  }
}

const Footer = () => {
  return (
    <div>
      <footer>
        <div>
          <p>
            基于星云链运行，使用前请先安装
            <a
              target="_blank"
              href="https://github.com/ChengOrangeJu/WebExtensionWallet"
            >
              <strong>
                <font color="#000"> Chrome Nebulas-WebExtensionWallet </font>
              </strong>
            </a>
            钱包插件。
          </p>
          © 2018 Copyright
          <a target="_blank" href="https://nebulas.io/" />
          <a
            target="_blank"
            href="https://incentive.nebulas.io/cn/signup.html?invite=mfd8C"
          >
            &nbsp;&nbsp;注册星云开发者(奖励110Nas)
          </a>
          <br />
        </div>
        <br />
      </footer>
    </div>
  );
};

export default App;
