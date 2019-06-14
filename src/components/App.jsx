import React from 'react';
import QuarantineZonesContainer from '../containers/QuarantineZonesContainer';
import ZombieLocatorContainer from '../containers/ZombieLocatorContainer';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        margin: 'auto',
        padding: '16px',
        width: '100%'
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          width: '70%'
        }}
      >
        <div
          className="c-zombie--title"
          style={{ textAlign: 'center', marginBottom: '16px', width: '100%' }}
        >
          Zombie Manager!
        </div>
        <QuarantineZonesContainer />
      </div>
      <div
        style={{
          margin: '0 auto',
          width: '25%'
        }}
      >
        <ZombieLocatorContainer />
      </div>
    </div>
  );
}

export default App;
