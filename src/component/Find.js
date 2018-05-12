import React, { Component } from "react";
import { Button, Checkbox, Form, ItemDescription } from "semantic-ui-react";
import { sendToBlockChain } from "./BlockChain.js";
import { Modal } from "react-bootstrap";

const Find = () => {
  let style = {
    width: "70%",
    textAlgin: "left",
    margin: "0 auto"
  };

  return (
    <div style={style}>
      <MyForm />
    </div>
  );
};

class MyForm extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      discover: "",
      dapp_url: "",
      img_url: "",
      dapp_desc: "",
      show_alert: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(e, number) {
    if (number == 1) {
      this.setState({
        fullName: e.target.value
      });
    } else if (number == 2) {
      this.setState({
        discover: e.target.value
      });
    } else if (number == 3) {
      this.setState({
        dapp_url: e.target.value
      });
    } else if(number == 4){
      this.setState({
        img_url: e.target.value
      });
    }else {
      this.setState({
        dapp_desc: e.target.value
      });
    }
  }

  sendForm() {
    var state_str = JSON.stringify(this.state);
    var dic = []
    dic.push(state_str)
    sendToBlockChain(JSON.stringify(dic), function callback(resp) {
      console.log(resp);
    });
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Dapp名称"
              placeholder="名称"
              onChange={(ev, index) => {
                this.handleChange(ev, 1);
              }}
            />
            <Form.Input
              fluid
              label="发现人"
              placeholder="昵称"
              onChange={(ev, index) => {
                this.handleChange(ev, 2);
              }}
            />
          </Form.Group>
          <Form.Input
            fluid
            label="Dapp Url"
            placeholder="http://"
            onChange={(ev, index) => {
              this.handleChange(ev, 3);
            }}
          />
          <Form.Input
            fluid
            label="Image Url"
            placeholder="请提交有效图片，留空将使用默认图片"
            onChange={(ev, index) => {
              this.handleChange(ev, 4);
            }}
          />
          <Form.TextArea
            label="描述"
            placeholder="简单说说这个App吧"
            onChange={(ev, index) => {
              this.handleChange(ev, 5);
            }}
          />
          <Form.Button color="green" onClick={this.sendForm.bind(this)}>
            Submit
          </Form.Button>
        </Form>
      </div>
    );
  }
}

export default Find;
