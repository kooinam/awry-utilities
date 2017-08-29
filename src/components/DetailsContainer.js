import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import uuidV4 from 'uuid/v4';

/*
  <DetailsContainer
    details={[{
      size: 'md',
      title: 'Email',
      value: this.props.user,
    }]}
  />
*/

class DetailsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.renderDetails = this.renderDetails.bind(this);
  }

  renderDetails = () => {
    const details = this.props.details.map((detail) => {
      const size = detail.size;
      let col = 12;
      if (size === 'sm') {
        col = 6;
      } else if (size === 'lg') {
        col = 24;
      }

      return (
        <Col span={col} className="ant-details" key={uuidV4()}>
          <Row>
            <Col span={8} className="ant-details-title">
              {detail.title}
            </Col>
            <Col span={16} className="ant-details-value">
              {detail.value}
            </Col>
          </Row>
        </Col>
      );
    });

    return details;
  }

  render() {
    return (
      <Row className={`ant-details-container ${this.props.className}`}>
        {this.renderDetails()}
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(DetailsContainer);