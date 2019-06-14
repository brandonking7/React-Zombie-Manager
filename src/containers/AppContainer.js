import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as zombieActionCreators from '../actions/zombieActions';
import App from '../components/App';

const propTypes = {
  actions: PropTypes.shape({
    zombie: PropTypes.shape({
      getZombies: PropTypes.func.isRequired
    }).isRequired
  }).isRequired
};

class AppContainer extends Component {
  componentDidMount() {
    this.props.actions.zombie.getZombies();
  }
  render() {
    return <App {...this.props} />;
  }
}

AppContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    zombies: state.zombie.get('zombies')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      zombie: bindActionCreators(zombieActionCreators, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
