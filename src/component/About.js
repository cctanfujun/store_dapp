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
            星云榜单是为了帮助发现好用的Dapp,用户可以给你看好的应用进行投票。
          </p>
        </Accordion.Content>
      </Accordion>
    )
  }
}

export default About;
