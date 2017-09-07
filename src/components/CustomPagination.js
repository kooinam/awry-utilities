import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

/*
  <CustomPagination
    key={this.state.tableParams.uuid}
    tableParams={this.state.tableParams}
    loadItems={this.loadItems}
    urlGetter={null}
    anchor={null}
  />
*/

class CustomPagination extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChangePagination = this.handleChangePagination.bind(this);
    this.renderPaginationPage = this.renderPaginationPage.bind(this);
  }

  handleChangePagination = (page, pageSize) => {
    const tableParams = this.props.tableParams;
    tableParams.pagination.current = page;
    tableParams.pagination.per_page = pageSize
    tableParams.rotateUuid();
    this.props.loadItems();

    if (this.props.anchor && document.getElementById(this.props.anchor)) {
      window.scrollTo(0, document.getElementById(this.props.anchor).getBoundingClientRect().top + window.scrollY);
    }
  }

  renderPaginationPage = (page, type) => {
    let inner = null;
    if (type === 'next') {
      inner = null;
    }
    else if (type === 'prev') {
      inner = null;
    }
    else if (type === 'page') {
      inner = page;
    }

    const to = {
      search: `?page=${page}`,
      pathname: this.props.urlGetter(page),
    };

    return (
      <Link to={to} className="page-inner">
        {inner}
      </Link>
    );
  }

  render() {
    let pagination = (
      <Pagination
        className="ant-pagination"
        itemRender= {this.props.urlGetter ? this.renderPaginationPage : undefined}
        current={this.props.tableParams.pagination.current}
        total={this.props.tableParams.pagination.total}
        defaultPageSize={this.props.tableParams.pagination.per_page}
        onChange={this.handleChangePagination}
        showSizeChanger
        onShowSizeChange={this.handleChangePagination}
      />
    );
    if (this.props.hideSizeChanger) {
      pagination = (
        <Pagination
          className="ant-pagination"
          itemRender= {this.props.urlGetter ? this.renderPaginationPage : undefined}
          current={this.props.tableParams.pagination.current}
          total={this.props.tableParams.pagination.total}
          defaultPageSize={this.props.tableParams.pagination.per_page}
          onChange={this.handleChangePagination}
        />
      );
    }

    return pagination;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(CustomPagination);
