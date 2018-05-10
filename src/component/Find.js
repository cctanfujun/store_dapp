import React, { Component } from "react";
import { Button, Checkbox, Form, ItemDescription } from "semantic-ui-react";

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
      dapp_desc: ""
    };
  }

  handleChange(e, number){
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
    } else {
      this.setState({
        dapp_desc: e.target.value
      });
    }
  };

  sendForm() {
    var sned = this.state;
  }

  render() {
    return (
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
        <Form.TextArea
          label="描述"
          placeholder="简单说说这个App吧"
          onChange={(ev, index) => {
            this.handleChange(ev, 4);
          }}
        />
        <Form.Button color="green" onClick={this.sendForm}>
          Submit
        </Form.Button>
      </Form>
    );
  }
}

export default Find;
