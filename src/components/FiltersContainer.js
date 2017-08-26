import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input } from 'antd';

/*
  <FiltersContainer
    filters={[{
      size: 'sm',
      name: 'Username',
      field: 'username',
    }]}
    onSearch={this.handleSearch}
  />
*/

class FiltersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.renderFilters = this.renderFilters.bind(this);
  }

  renderFilters = () => {
    const filters = this.props.filters.map((filter) => {
      const size = filter.size;
      let col = 4;
      if (size === 'md') {
        col = 8;
      } else if (size === 'lg') {
        col = 12;
      }

      return (
        <Col span={col} key={filter.field} className={'ant-filter'}>
          <label htmlFor={filter.field}>
            {filter.name}:
          </label>
          <Input
            onChange={(event) => {
              this.props.onSearch(`${filter.field}_cont`, event.target.value);
            }}
            placeholder={filter.name}
          />
        </Col>
      );
    });

    return filters;
  }

  render() {
    return (
      <Row className="ant-filters">
        {this.renderFilters()}
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(FiltersContainer);
