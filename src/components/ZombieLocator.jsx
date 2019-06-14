import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  zombies: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

function ZombieLocator({ zombies }) {
  return (
    <div>
      <table className="c-zombie__table">
        <thead>
          {zombies.length > 0 ? (
            <tr>
              <th className="c-zombie__zombie-id-th">Zombie ID</th>
              <th className="c-zombie__zombie-location-td">Zombie Location</th>
            </tr>
          ) : (
            <tr>
              <th className="c-zombie__zombie-id-th">Zombie ID</th>
            </tr>
          )}
        </thead>
        <tbody>
          {zombies.length === 0 && (
            <tr>
              <td>No zombie data available</td>
            </tr>
          )}

          {zombies &&
            zombies
              .sort((a, b) => a.id - b.id)
              .map(zombie => {
                const key = zombie.id;
                return (
                  <tr key={key}>
                    <td>
                      <div>
                        {zombie.zombieType === 'Warehouse' && (
                          <div className="c-zombie__w-zombie" />
                        )}
                        {zombie.zombieType === 'School' && (
                          <div className="c-zombie__s-zombie" />
                        )}
                        {zombie.zombieType === 'Hospital' && (
                          <div className="c-zombie__h-zombie" />
                        )}
                      </div>
                    </td>
                    <td className="c-zombie__zombie-location-td">
                      {zombie.zoneName}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

ZombieLocator.propTypes = propTypes;

export default ZombieLocator;
