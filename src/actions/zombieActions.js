import zombieService from '../services/zombieService';

function getZombiesStart() {
  return {
    type: 'GET_ZOMBIES_START'
  };
}

function getZombiesSuccess(zombies) {
  return {
    type: 'GET_ZOMBIES_SUCCESS',
    payload: { zombies }
  };
}

function getZombiesFailure(err) {
  return {
    type: 'GET_ZOMBIES_FAILURE',
    error: true,
    payload: err
  };
}

function getZombies() {
  return function(dispatch) {
    dispatch(getZombiesStart());

    return zombieService
      .getZombies()
      .then(zombies => dispatch(getZombiesSuccess(zombies)))
      .catch(err => {
        dispatch(getZombiesFailure(err));
        throw err;
      });
  };
}

function createZombieStart() {
  return {
    type: 'CREATE_ZOMBIE_START'
  };
}

function createZombieSuccess(zombieInfo) {
  return {
    type: 'CREATE_ZOMBIE_SUCCESS',
    payload: { zombieInfo }
  };
}

function createZombieFailure(err) {
  return {
    type: 'CREATE_ZOMBIE_FAILURE',
    error: true,
    payload: err
  };
}

function createZombie(params) {
  return function(dispatch) {
    dispatch(createZombieStart());

    return zombieService
      .addZombie(params)
      .then(updatedZombies => dispatch(createZombieSuccess(updatedZombies)))
      .catch(err => {
        dispatch(createZombieFailure(err));
        throw err;
      });
  };
}

function updateZombieZoneStart() {
  return {
    type: 'UPDATE_ZOMBIE_ZONE_START'
  };
}
function updateZombieZoneSuccess(zombieInfo) {
  return {
    type: 'UPDATE_ZOMBIE_ZONE_SUCCESS',
    payload: { zombieInfo }
  };
}

function updateZombieZoneFailure(err) {
  return {
    type: 'UPDATE_ZOMBIE_ZONE_FAILURE',
    error: true,
    payload: err
  };
}

function updateZombieZone(id, zombieInfo) {
  return function(dispatch) {
    dispatch(updateZombieZoneStart());

    return zombieService
      .updateZombieZone(id, zombieInfo)
      .then(updatedZombieZone =>
        dispatch(updateZombieZoneSuccess(updatedZombieZone))
      )
      .catch(err => {
        dispatch(updateZombieZoneFailure(err));
        throw err;
      });
  };
}

export { getZombies, createZombie, updateZombieZone };
