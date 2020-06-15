import React, { useState } from 'react';
import { YMaps, Map, Placemark } from "react-yandex-maps";
import PropTypes from 'prop-types';

function Delivery__Map(props) {
    // 59.938924, 30.315311 - по дефолту карта настроена на Петербург
    const [mapData, setMapData] = useState({
        center: [59.938924, 30.315311],
        zoom: 8,
    });
    // Указатель тоже в области СПб выставлен
    const [coordinates, setCoordinates] = useState([[55.684758, 37.738521]]);

    const [YMapState, setYMapState] = useState('');

    const onMapClick = (event) => {
        event.stopPropagation();
    // по клику извлекаем координаты, меняем координаты в состоянии компонента
        const coords = event.get("coords");
        setCoordinates([coords]);
        setMapData({
            center: coords,
            zoom: 8,            
        });

        const myGeocoder = YMapState.geocode([coords]);
        myGeocoder.then(res => {
            let firstGeoObject = res.geoObjects.get(0);
            // парсим по координатам название региона 
            const rigion = firstGeoObject.getAdministrativeAreas()[0];
            props.setRigionHandler(rigion || "Укажите ближайший населенный пункт на карте");
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

Delivery__Map.propTypes = {
    setRigionHandler: PropTypes.func.isRequired,
};


export default Delivery__Map;