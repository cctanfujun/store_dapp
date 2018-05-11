import React, { Component } from "react";
import { Accordion, Icon } from 'semantic-ui-react'

class About extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion fluid styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          什么是星云榜单?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            星云榜单是为了帮助发现好用的Dapp,用户可以使用 Nrank 给你看好的应用进行投票,先投投票的用户因为
            起到了发现好应用的目的，可以获得后投票用户的 Nrank 奖励。
          </p>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
          <Icon name='dropdown' />
          我怎么获得 Nrank?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            有如下几种方式可以获得Nrank：
            <br/>
            <br/>
            * 提交你发现的新的 Dapp Url 可以获得 100 Nrank
            <br/>
            <br/>
            * 使用 Nas 进行购买 初期比例为 1：50000 之后会随着 Nas池 和 Nrank池的数量进行动态调整
            <br/>
            <br/>
            * 每个用户每日可以领取 10 Nrank

          </p>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Nrank 价值?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            用户投票要消耗 Nrank ,同时 Nrank 是在不断减少的,如果广告商需要 Dapp 靠前需要消耗 Nrank。
          </p>
          <p>
            Nrank 和 Nas 可以兑换。
          </p>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
          <Icon name='dropdown' />
          点赞收益规则?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <p>
            用户点赞的消耗的 Nrank 20% 销毁，80% 分配给当前已点赞用户。
          </p>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick}>
          <Icon name='dropdown' />
          使用 Nrank 兑换 Nas?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 4}>
          <p>
            用户可以使用 Nrank 兑换 Nas，比例是动态的 根据当前 Nrank 池和 Nas 池数量进行调整。
          </p>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 5} index={5} onClick={this.handleClick}>
          <Icon name='dropdown' />
          如何让自己的Dapp排名靠前?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 5}>
          <p>
            获得 Nrank 多的Dapp排名靠前，使用 Nrank 点赞吧！
          </p>
        </Accordion.Content>
      </Accordion>
    )
  }
}

export default About;
