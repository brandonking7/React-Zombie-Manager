import React from 'react';
import QuarantineZonesContainer from '../containers/QuarantineZonesContainer';
import ZombieLocatorContainer from '../containers/ZombieLocatorContainer';

const appContainerStyle = {
  display: 'flex',
  margin: 'auto',
  padding: '16px',
  width: '100%'
};

const quarantineContainerStyle = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  width: '70%'
};

function App() {
  return (
    <div style={appContainerStyle}>
      <div style={quarantineContainerStyle}>
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
