import apiService from './apiService';

//* ** Should be using Apollo or graphql-request ***
function getZombies() {
  return apiService
    .post('/graphql', {
      query: '{zombies {id zoneName zoneIndex zombieType} }'
    })
    .then(response => {
      return response.data.data.zombies;
    })
    .catch(error => {
      throw error;
    });
}

function addZombie(zombieInfo) {
  return apiService
    .post('/graphql', {
      query: `mutation ($zoneName: String!, $zombieType: String) {
                addZombie(zoneName: $zoneName, zombieType: $zombieType) {
                  id
                  zoneName
                  zombieType
                }
              }`,
      variables: {
        zoneName: `${zombieInfo.quarantineZoneName}`
      }
    })
    .then(response => {
      return response.data.data.addZombie;
    })
    .catch(error => {
      throw error;
    });
}

function updateZombieZone(id, zombieInfo) {
  return apiService
    .post('/graphql', {
      query: `mutation ($id: ID!, $zoneName: String!, $zoneList: String) {
                updateZombie(id: $id, zoneName: $zoneName, zoneList: $zoneList) {
                  id
                  zoneName
                  zoneIndex
                }
              }`,
      variables: {
        id: `${id}`,
        zoneName: `${zombieInfo.zone}`,
        zoneList: `${zombieInfo.zoneList}`
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}

export default { getZombies, addZombie, updateZombieZone };
