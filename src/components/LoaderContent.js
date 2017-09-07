import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';

type Props = {
  children: Component,
  isError: Boolean,
  delay: Number,
  duration: Number,
}

class LoaderContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.renderContent = this.renderContent.bind(this);
  }

  props: Props;

  renderContent = () => {
    if (!this.props.isError) {
      return (
        <div key="loader-container">
          { this.props.children }
        </div>
      );
    }
    return null;
  }

  render() {
    const delay = this.props.delay || 0;
    const duration = this.props.duration || 450;

    if (typeof (window) !== 'undefined') {
      return (
        <QueueAnim type={['right']} delay={delay} duration={duration}>
          {this.renderContent()}
        </QueueAnim>
      );
    }
    return this.renderContent();
  }
}

export default LoaderContent;
