import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const propTypes = {
  actions: PropTypes.shape({
    zombie: PropTypes.shape({
      getZombies: PropTypes.func.isRequired,
      createZombie: PropTypes.func.isRequired,
      updateZombieZone: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  zombies: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

const reorder = (list, startIndex, endIndex) => {
  const newIndex = endIndex < 0 ? 0 : endIndex;
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(newIndex, 0, removed);

  return result;
};

const zoneStyles = {
  border: '3px dashed red',
  height: '300px',
  width: '250px'
};

const schoolZoneStyles = {
  border: '3px dashed red',
  height: '300px',
  position: 'relative',
  top: '100%',
  width: '250px'
};

const zoneTitleStyles = {
  color: 'blue',
  fontWeight: '600'
};

const zoneOverLoadTitleStyles = {
  color: 'green',
  fontWeight: '800'
};

const zombieButtonStyle = {
  background: 'yellow',
  color: 'red',
  cursor: 'pointer',
  fontSize: '20px',
  fontWeight: '600',
  height: '25px',
  outline: 'none',
  width: '25px'
};

class QuarantineZones extends Component {
  constructor(props) {
    super(props);

    this.createZombie = this.createZombie.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updateZombieZone = this.updateZombieZone.bind(this);
    this.state = {
      zones: ['Warehouse', 'School', 'Hospital'],
      zonesArray: {
        Warehouse: [],
        School: [],
        Hospital: []
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) {
      return;
    }
    const zoneList = this.state.zones;
    zoneList.map(zone => {
      return (zoneList[zone] = []);
    });
    nextProps.zombies
      .sort((a, b) => a.zoneIndex - b.zoneIndex)
      .map(zombie => {
        return zoneList[zombie.zoneName].push(zombie);
      });
    this.setState({
      zonesArray: zoneList
    });
  }

  onDragEnd(ev) {
    if (!ev.destination) {
      return;
    }
    const { source, destination } = ev;
    const sourceList = this.state.zonesArray[source.droppableId];
    const destinationList = this.state.zonesArray[destination.droppableId];
    if (source.droppableId === destination.droppableId) {
      const updatedList = reorder(sourceList, source.index, destination.index);
      const zonesArray = {
        ...this.state.zonesArray,
        [source.droppableId]: updatedList
      };
      this.setState({ zonesArray });
      const sourceZombie = sourceList[source.index];
      this.updateZombieZone(
        sourceZombie.id,
        destination.droppableId,
        updatedList
      );
    } else {
      // moving to a different list
      // remove from original, insert into new
      const [value] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, value);
      const zonesArray = {
        ...this.state.zonesArray,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destinationList
      };
      this.setState({ zonesArray });
      this.updateZombieZone(value.id, destination.droppableId, destinationList);
    }
  }

  createZombie(zone) {
    const info = {
      quarantineZoneName: zone
    };
    this.props.actions.zombie.createZombie(info).then(() => {
      this.props.actions.zombie.getZombies();
    });
  }

  updateZombieZone(zombieID, zone, zoneList) {
    const list = JSON.stringify(zoneList);
    const zombieInfo = {
      zone,
      zoneList: list
    };
    return this.props.actions.zombie
      .updateZombieZone(zombieID, zombieInfo)
      .then(() => {
        this.props.actions.zombie.getZombies();
      });
  }

  render() {
    const { zones, zonesArray } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%'
          }}
        >
          {zones.map((zone, index) => {
            return (
              <Droppable droppableId={`${zone}`} type="ZONE" key={index}>
                {(provided, snapshot) => (
                  <ul
                    style={zone === 'School' ? schoolZoneStyles : zoneStyles}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                      }}
                    >
                      {zonesArray[zone].length > 6 ? (
                        <div style={zoneOverLoadTitleStyles}>
                          ZOMBIE OVERLOAD!
                        </div>
                      ) : (
                        <div style={zoneTitleStyles}>
                          {zone} Quarantine Zone
                        </div>
                      )}

                      <button
                        style={zombieButtonStyle}
                        onClick={() => {
                          this.createZombie(zone);
                        }}
                      >
                        +
                      </button>
                    </div>

                    {zonesArray[zone].map((zombie, zombieIndex) => {
                      return (
                        <Draggable
                          key={zombieIndex}
                          draggableId={`${zombie.id}`}
                          index={zombieIndex}
                        >
                          {(provided, snapshot) => (
                            <li
                              key={zombieIndex}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {zombie.zombieType === 'Warehouse' && (
                                <div className="c-zombie__w-zombie" />
                              )}
                              {zombie.zombieType === 'School' && (
                                <div className="c-zombie__s-zombie" />
                              )}
                              {zombie.zombieType === 'Hospital' && (
                                <div className="c-zombie__h-zombie" />
                              )}
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                  </ul>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    );
  }
}

QuarantineZones.propTypes = propTypes;

export default QuarantineZones;
