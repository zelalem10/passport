import React from 'react';
import GoogleMapReact from 'google-map-react';
const GoogleAddress = (props) => {
    return ( 
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: props.key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
     );
}
 
export default GoogleAddress;