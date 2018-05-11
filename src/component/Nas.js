import React, { Component } from "react";
import { Jumbotron, Alert } from "react-bootstrap";
import {
  Button,
  Icon,
  Image as ImageComponent,
  Item,
  Label
} from "semantic-ui-react";

class Nas extends Component {
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
          <strong>注意!</strong> Nas 和 Nrank 的兑换比例 是根据当前 Nas 池 和
          Nrank 池数量动态调整的! 下方显示比例为大致比例。
        </Alert>

        <Item.Group style={{ width: "40%", margin: "0 auto" }}>
          <Item>
            <Item.Image src="./assets/images/steve.jpg" />

            <Item.Content>
              <Item.Header as="a" floated="left">
                兑换 NAS
              </Item.Header>
              <Item.Meta>
                <span className="cinema">使用 Nrank 兑换 Nas</span>
              </Item.Meta>
              <Item.Description>当前兑换比例约为 1000:1</Item.Description>
              <Item.Extra>
                <Button primary style={{ width: "40%" }}>
                  兑换
                  <Icon name="right chevron" />
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }
}

export default Nas;
