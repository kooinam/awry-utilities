import React, { Component } from 'react';
import { Card, Spin } from 'antd';

import Fade from './Fade';

class LoaderContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const duration = this.props.duration || 0.5;
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
        <Fade
          duration={duration}
        >
          {content}
        </Fade>
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
