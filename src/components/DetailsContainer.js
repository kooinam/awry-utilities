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
      let titleCol = 8;
      if (size === 'lg') {
        titleCol = 4;
        col = 24;
      }

      return (
        <Col md={col} className="ant-details" key={uuidV4()}>
          <Row>
            <Col md={titleCol} className="ant-details-title">
              {detail.title}
            </Col>
            <Col md={24 - titleCol} className="ant-details-value">
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
