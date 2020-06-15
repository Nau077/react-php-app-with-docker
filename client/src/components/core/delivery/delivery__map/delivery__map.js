import React, { useState } from 'react';
import { YMaps, Map, Placemark } from "react-yandex-maps";

function Delivery__Map(props) {

    const [mapData, setMapData] = useState({
        center: [59.938924, 30.315311],
        zoom: 8,
    });
      
    const [coordinates, setCoordinates] = useState([[55.684758, 37.738521]]);

    const [YMapState, setYMapState] = useState('');

    const onMapClick = (event) => {
        event.stopPropagation();

        const coords = event.get("coords");
        setCoordinates([coords]);
        setMapData({
            center: coords,
            zoom: 8,            
        });

        const myGeocoder = YMapState.geocode([coords]);
        myGeocoder.then(res => {
            let firstGeoObject = res.geoObjects.get(0);
            const region = firstGeoObject.getAdministrativeAreas()[0];
            props.setRigionHandler(region || "Укажите ближайший населенный пункт на карте");
        });
        
    };

    const getGeoLocation = ymaps => {

        setYMapState(ymaps);

        return ymaps.geolocation
            .get({ provider: "yandex", mapStateAutoApply: true })
            .then(result =>
                ymaps.geocode(result.geoObjects.position).then(res => {
                    let firstGeoObject = res.geoObjects.get(0);

                    const rigion = firstGeoObject.getAdministrativeAreas()[0];

                    setMapData({
                        center: firstGeoObject.geometry.getCoordinates(),
                        zoom: 8
                    });
                    setCoordinates([firstGeoObject.geometry.getCoordinates()]);

                    props.setRigionHandler(rigion || "Укажите ближайший населенный пункт на карте");   

                })
            );
    };

    const handleApiAvaliable = ymaps => {
        getGeoLocation(ymaps);
    };

    return (
        <div className="map-container">
            <YMaps query={{
                apikey: '45ccaf60-7908-468d-adde-66b6dca72de5', }}>
                <Map
                    onClick={onMapClick}
                    width='640'
                    key={'unuq'}
                    height={500}
                    state={ mapData }
                    modules={["geolocation", "geocode"]}
                    onLoad={ymaps => {
                        handleApiAvaliable(ymaps);
                    }}
                >
                    {coordinates.map(coordinate => <Placemark geometry={coordinate} key={'coordinate'}/>)}
                </Map>
            </YMaps>
        </div>
    );
}

export default Delivery__Map;