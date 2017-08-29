import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Select } from 'antd';

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
    this.renderSorting = this.renderSorting.bind(this);
  }

  renderFilters = () => {
    const filters = this.props.filters.map((filter) => {
      const size = filter.size;
      let col = 6;
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

  renderSorting = () => {
    if (this.props.sorting && this.props.sorting.length > 0)
    return (
      <Row className={'ant-sorting'}>
        <Col span="6">
          <label htmlFor="sorting">
            Sorting:
          </label>
          <Select
            labelInValue
            defaultValue={this.props.sorting[0]}
            onChange={(option) => {
              this.props.onSearch('s', [option.key]);
            }}
          >
            {
              this.props.sorting.map((item) => {
                return (
                  <Select.Option key={item.key}>
                    {item.label}
                  </Select.Option>
                )
              })
            }
          </Select>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Row>
        <Col span="24">
          <Row className="ant-filters">
            {this.renderFilters()}
          </Row>
          {this.renderSorting()}
        </Col>
        <Col span="24">
          <hr className="ant-hr" />
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(FiltersContainer);