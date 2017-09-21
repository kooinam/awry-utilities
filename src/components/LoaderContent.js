import React, { Component } from 'react';
import { Card, Spin } from 'antd';
import QueueAnim from 'rc-queue-anim';

class LoaderContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const delay = this.props.delay || 0;
    const duration = this.props.duration || 800;
    const { inanimate, firstLoading, loading } = this.props;

    let content = this.props.children;

    if (this.props.isError) {
      content = (
        <div className="text-center ant-error">
          Something went wrong. Click
          &nbsp;
          <a onClick={this.props.onRetry}>
            here
          </a>
          &nbsp;
          to try again.
        </div>
      );
    }

    if (!inanimate && typeof(window) != 'undefined') {
      content = (
        <QueueAnim type={['right', 'alpha']} delay={delay} duration={duration}>
          <div key="loader-content">
            {content}
          </div>
        </QueueAnim>
      );
    }

    return (
      <Card loading={firstLoading} className={`ant-loader-card ${this.props.className}`}>
        <Spin spinning={(!firstLoading && loading) == true}>
          {content}
        </Spin>
      </Card>
    )
  }
}

export default LoaderContent;
