import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Button, Card, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Container, Header } from "semantic-ui-react";
import { getStoreItems, vote } from "./BlockChain.js";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    var obj = this;
    getStoreItems(function(resp) {
      var items_str = resp.result;
      var items_obj = JSON.parse(items_str);
      var data = [];
      for (var i = 0; i < items_obj.length; i++) {
        data.push(JSON.parse(items_obj[i]));
      }
      obj.setState({ items: data });
    });
  }
  render() {
    var datas = this.state.items;
    console.log(datas);

    return (
      <div>
        <Top />
        <Card.Group centered={true}>
          {datas.map(item => <Item item={item} />)}
        </Card.Group>
      </div>
    );
  }
}

class Top extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      show: "display"
    };
  }

  handleClick() {
    this.setState({
      show: "none"
    });
  }

  render() {
    let { show } = this.state;
    let style = {
      display: show
    };

    return (
      <div class="ui message" style={style}>
        <i aria-hidden="true" class="close icon" onClick={this.handleClick} />
        <div class="content">
          <h5>给你中意的 DAPP 投票。</h5>
          <h5>一起发现好应用吧！</h5>
        </div>
      </div>
    );
  }
}

Top.propTypes = {
  style: PropTypes.string
};

const Item = ({ item }) => {
  const voteApp = () => {
    vote(item.dapp_url);
  };

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="medium"
          src={
            item.img_url == ""
              ? "https://nebulas.io/docs/NebulasLogo.svg"
              : item.img_url
          }
        />
        <Card.Header>{item.fullName}</Card.Header>
        <Card.Meta>发现者:{item.discover}</Card.Meta>
        <Card.Description>
          {item.dapp_desc}
          <br />
          <br />
          <div>
            <Icon size="large" name="money" color="blue" /> 已有<strong>
              {item.rank == undefined ? 0 : item.rank} Nrank{" "}
            </strong>
            点赞
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={voteApp}>
            点赞
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

Item.propTypes = {
  item: PropTypes.array
};

export default Home;
