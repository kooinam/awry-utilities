import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Form, Input, Table } from 'antd';

import { getFieldError } from '../utils/UIManager';
import TableParams from '../utils/TableParams';
import Actioner from '../utils/Actioner';
import ErrorContainer from './ErrorContainer';

/*
  <SiderEditor
    item={this.props.user}
    formParams={
      {
        url: `/users/${this.props.user.username}.json`,
        axiosGetter: () => getAxios('membership-admin'),
        method: 'patch',
        itemName: 'user',
        ItemKlass: User,
        successMessageGetter: user =>
          `User ${user.email} updated successfully`,
        successCallback: (user) => {
          this.props.dispatch(push(`/admin/users/${user.username}`));
          this.props.dispatch(closeRightSider());
          this.props.loadItem();
        },
        errorMessageGetter: () =>
          `Failed to update User ${this.props.user.username}`,
      }
    }
    logParams={
      {
        axiosGetter: () => getAxios('log-admin'),
        itemsName: 'users',
        ItemKlass: User,
        url: '/logs.json',
        key: 'update_profile',
        id: this.props.user.id,
        fieldNames,
      }
    }
    formInputsGetter={
      (item, form, actioner) => {
        return commonUserFormInputs(item, form, actioner, fieldNames);
      }
    }
    formParamsParser={
      (attributes) => {
        return {
          user: attributes,
        };
      }
    }
  />
*/

class SiderEditor extends Component {
  constructor(props) {
    super(props);

    const { formParams, logParams } = this.props;

    this.state = {
      actioner: new Actioner({
        component: this,
        key: 'actioner',
        axiosGetter: formParams.axiosGetter,
        method: 'patch',
        itemName: formParams.itemName,
        ItemKlass: formParams.ItemKlass,
        successMessageGetter: formParams.successMessageGetter,
        successCallback: formParams.successCallback,
        errorMessageGetter: formParams.errorMessageGetter,
      }),
      tableParams: new TableParams({
        component: this,
        key: 'tableParams',
        axiosGetter: logParams.axiosGetter,
        itemsName: 'logs',
        ItemKlass: Object,
        url: logParams.url,
        filter: {
          s: ['created_at DESC'],
        },
        paramsGetter: tableParams => {
          return {
            params: {
              q: tableParams.filter,
              per_page: tableParams.pagination.per_page,
              page: tableParams.pagination.current,
              log_action: logParams.key,
              log_id: logParams.id,
              field_names: logParams.fieldNames,
            },
          };
        },
      }),
    };

    this.renderItems = this.renderItems.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadItems = this.state.tableParams.loadItems.bind(this);
  }

  componentDidMount = () => {
    this.loadItems();
  }

  renderItems = () => {
    if (this.state.tableParams.isError) {
      return (
        <ErrorContainer
          key={this.state.tableParams.uuid}
          spinning={this.state.tableParams.isLoading}
          onRetry={this.loadItems}
        />
      );
    }

    const columns = [{
      className: '',
      width: '20%',
      title: 'Done by',
      key: 'username',
      render: (value, record) => {
        return (
          <Link to={`/admin/users/${record.username}`} target="_blank">
            {record.username}
          </Link>
        );
      },
    }, {
      className: '',
      width: '20%',
      title: 'Time',
      key: 'created_at',
      render: (value, record) => {
        return (
          <div>
            {record.created_at}
          </div>
        );
      },
    }, {
      className: '',
      width: '60%',
      title: 'Remarks',
      key: 'remark',
      render: (value, record) => {
        return (
          <div>
            {record.remarks}
          </div>
        )
      }
    }];

    const locale = {
      emptyText: 'No Log found',
    };

    return (
      <Table
        columns={columns}
        dataSource={this.state.tableParams.items}
        bordered
        locale={locale}
        pagination={false}
        rowKey="id"
        loading={this.state.tableParams.isLoading}
      />
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }

      const attributes = (this.props.form.getFieldsValue());
      const params = this.props.formParamsParser(attributes);

      this.state.actioner.do(this.props.formParams.url, params);

      return true;
    });
  }

  render() {
    const { actioner } = this.state;
    const { form, formInputsGetter, item } = this.props;

    let formInputs = null;
    if (formInputsGetter) {
      formInputs = formInputsGetter(item, form, actioner);
    }

    return (
      <Row className={`ant-sider-editor ${this.props.className}`}>
        <Col md={24}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={24}>
                <Form.Item {...getFieldError(actioner.error, 'remarks')} label="Remarks" hasFeedback>
                  {form.getFieldDecorator('remarks', {
                    rules: [
                      { required: true, message: 'Remarks is required' },
                    ],
                    initialValue: null,
                  })(
                    <Input type="textarea" placeholder="Remarks" />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            {formInputs}
            <Row>
              <Col md={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={this.state.actioner.isLoading}>
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={24} className={'ant-card-content'}>
          {this.renderItems()}
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Form.create()(SiderEditor));
