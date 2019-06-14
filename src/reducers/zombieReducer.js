import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
  isActive: false,
  zombies: []
});

function zombieReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_ZOMBIES_START':
    return state.withMutations(map => {
      map.set('isActive', true);
    });
  case 'GET_ZOMBIES_SUCCESS':
    return state.withMutations(map => {
      map.set('isActive', false);
      map.set('zombies', action.payload.zombies);
    });
  case 'GET_ZOMBIES_FAILURE':
    return state.withMutations(map => {
      map.set('isActive', false);
    });
  case 'CREATE_ZOMBIE_START':
    return state.withMutations(map => {
      map.set('isActive', true);
    });
  case 'CREATE_ZOMBIE_SUCCESS':
    return state.withMutations(map => {
      map.set('isActive', false);
    });
  case 'CREATE_ZOMBIE_FAILURE':
    return state.withMutations(map => {
      map.set('isActive', false);
    });
  case 'UPDATE_ZOMBIE_ZONE_START':
    return state.withMutations(map => {
      map.set('isActive', true);
    });
  case 'UPDATE_ZOMBIE_ZONE_SUCCESS':
    return state.withMutations(map => {
      map.set('isActive', false);
    });
  case 'UPDATE_ZOMBIE_ZONE_FAILURE':
    return state.withMutations(map => {
      map.set('isActive', false);
    });
  default:
    return state;
  }
}

export default zombieReducer;
