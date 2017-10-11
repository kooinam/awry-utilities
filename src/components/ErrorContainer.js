import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

/*
  <ErrorContainer
    key={this.state.tableParams.uuid}
    onRetry={this.loadItems}
    spinning={this.state.tableParams.isLoading}
  />
*/

class ErrorContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Spin spinning={this.props.spinning} className={`${this.props.className}`}>
        {
          (this.props.children) ? this.props.children : (
            <div className={`ant-error ${(!this.props.noTextCenter) ? 'text-center' : ''}`}>
              Something went wrong. Click&nbsp;
              <a role="button" tabIndex="0" onClick={this.props.onRetry}>
                here
              </a>
              &nbsp;to try again.
            </div>
          )
        }
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ErrorContainer);
