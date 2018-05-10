import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Button, Card, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Container, Header } from "semantic-ui-react";

const items = [
  {
    project_name: "星云榜单",
    descover: "xiaochen",
    desc: "发现有趣的Dapp获得Nrank奖励",
    image_url: "xx",
    app_url: "",
    rank: 15
  },
  {
    project_name: "星云榜单",
    descover: "xiaochen",
    desc: "这是一个有趣的Dapp",
    image_url: "xx",
    app_url: "",
    rank: 15
  },
  {
    project_name: "星云榜单",
    descover: "xiaochen",
    desc: "这是一个有趣的Dapp",
    image_url: "xx",
    app_url: "",
    rank: 15
  },
  {
    project_name: "星云榜单",
    descover: "xiaochen",
    desc: "这是一个有趣的Dapp",
    image_url: "xx",
    app_url: "",
    rank: 15
  }
];

const Home = () => (
  <div>
    <Top />
    <Card.Group centered={true}>
      {items.map(item => <Item item={item} />)}
    </Card.Group>
  </div>
);

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
          <h5>使用 NRank 给你中意的 DAPP 投票。</h5>
          <h5>点赞后可以分成之后点赞用户的 NRank。一起发现好应用吧！</h5>
        </div>
      </div>
    );
  }
}

Top.propTypes = {
  style: PropTypes.string
};

const Item = ({ item }) => (
  <Card>
    <Card.Content>
      <Image floated="right" size="medium" src="./assets/images/steve.jpg" />
      <Card.Header>{item.project_name}</Card.Header>
      <Card.Meta>发现者:{item.descover}</Card.Meta>
      <Card.Description>
        {item.desc}
        <br />
        <br />
        <div>
          <Icon size="large" name="money" color="blue" /> 已有<strong>
            {item.rank} Nrank{" "}
          </strong>
          点赞
        </div>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="green">
          点赞
        </Button>
      </div>
    </Card.Content>
  </Card>
);

Item.propTypes = {
  item: PropTypes.array
};

export default Home;
