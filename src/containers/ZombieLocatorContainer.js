import { connect } from 'react-redux';
import ZombieLocator from '../components/ZombieLocator';

function mapStateToProps(state) {
  return {
    zombies: state.zombie.get('zombies')
  };
}

export default connect(
  mapStateToProps,
  null
)(ZombieLocator);
