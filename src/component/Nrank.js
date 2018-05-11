import React, { Component } from "react";
import { Jumbotron, Alert } from "react-bootstrap";
import { getfreeNrank } from "./BlockChain.js";
import {
  Button,
  Icon,
  Image as ImageComponent,
  Item,
  Label
} from "semantic-ui-react";
class Nrank extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      discover: "",
      dapp_url: "",
      dapp_desc: "",
      show_alert: false
    };
  }

  render() {
    return (
      <div>
        <Alert bsStyle="warning">
          <strong>注意!</strong> Nrank 和 Nas 的兑换比例 是根据当前 Nas 池 和
          Nrank 池数量动态调整的! 下方显示比例为大致比例。
        </Alert>

        <Item.Group style={{ width: "40%", margin: "0 auto" }}>
          <Item>
            <Item.Image src="./assets/images/steve.jpg" />

            <Item.Content>
              <Item.Header as="a" floated="left">
                兑换 Nrank
              </Item.Header>
              <Item.Meta>
                <span className="cinema">使用 Nas 兑换 Nrank</span>
              </Item.Meta>
              <Item.Description>当前兑换比例约为 1：10000</Item.Description>
              <Item.Extra>
                <Button primary style={{ width: "40%" }}>
                  兑换
                  <Icon name="right chevron" />
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <br />
        <br />
        <NrankFree />
      </div>
    );
  }
}

const NrankFree = () => {
  const getFree = () => {
    getfreeNrank();
  };

  return (
    <Jumbotron>
      <h3>每日免费 Nrank</h3>
      <p>每天每个用户可以获得 5 Nrank,快用 Nrank 点赞吧！</p>
      <p>
        <Button bsStyle="primary" onClick={getFree}>
          获取
        </Button>
      </p>
    </Jumbotron>
  );
};

export default Nrank;
