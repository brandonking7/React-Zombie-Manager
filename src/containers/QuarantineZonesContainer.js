import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as zombieActionCreators from '../actions/zombieActions';
import QuarantineZones from '../components/QuarantineZones';

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
)(QuarantineZones);
