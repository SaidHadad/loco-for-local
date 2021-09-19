import React, { useEffect } from 'react';
import * as parksData from "../data/skateboard-parks.json";

// integrate apollo hooks in homepage
import { useQuery } from '@apollo/client';
import { QUERY_VENDORS } from '../utils/queries';

// google react api libraries
import {
    GoogleMap,
    useLoadScript,
    Marker,
    // InfoWindow,
} from '@react-google-maps/api';

// styling for the map
import mapStyles from '../mapStyles';

// set up options to pass to the googlemaps component (to avoid rerendering)
const libraries = ['places'];
const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
};

// lat/lng for ottawa, toronto is lat: 43.6532, lng:-79.3831
const center = {
    lat: 45.4247,
    lng: -75.6950
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}

const Search = () => {
    // use loadscript hook to setup load script/communicate with google api
    const { loadError, isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });
    
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_VENDORS);
    
    useEffect(() => {
        if(data) {
            console.log(data.vendors);
            console.log(data.vendors[0].title);
        }
    }, [data]);

    // get vendor data out of query's response
    const vendors = data?.vendors || [];
    // console.log(vendors);
    // console.log(vendors[0].title);

    // these if's need to be last 
    if (loadError) return "Error loading map";
    if (!isLoaded) return "Loading Maps";

    return (
        <section>
            <div className="center" id="search">
                <h1 className="page-header">Loco for local</h1>

            </div>

            <div className="center">
            </div>

            <br></br>

            <div>

                <div className="map-container">
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={10}
                        center={center}
                        options={options}
                    >
                        {/* embbed markers inside maps component */}
                        {parksData.features.map((park) => (
                            <Marker
                                key={park.properties.PARK_ID}
                                position={{
                                    lat: park.geometry.coordinates[1],
                                    lng: park.geometry.coordinates[0]
                                }}
                            />
                        ))}
                    </GoogleMap>
                </div>
                <p>
                    Add a brief description with a h1
                </p>
            </div>
        </section>
    );
}

export default Search;