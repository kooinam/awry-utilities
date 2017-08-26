import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
  <TabContainer
    onMount={this.handleMount}
  />
*/

class TabContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    if (this.props.onMount) {
      this.props.onMount(this);
    }
  }

  render() {
    return (
      <div />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(TabContainer);
