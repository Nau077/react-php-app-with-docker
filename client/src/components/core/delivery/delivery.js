import React, { useState } from 'react';
import Delivery__Map from './delivery__map/delivery__map';
import Delivery__Form from './delivery__form/delivery__form';
import { useDispatch, useSelector } from 'react-redux';
import { filterWaterbases } from '../../../actions/actions';
function Delivery() {

    const dispatch = useDispatch();
    const waterBases = useSelector(state => state.waterBases.waterBasesList); 
    const rigions = useSelector(state => state.rigions.rigionList);
    const [rigionValue, setRigeon] = useState('');

    const setRigionHandler = (rigionName) => {

        setRigeon(rigionName);
        
        const filterPayload = {
            rigion: rigionName,
            waterBases: waterBases.slice(),
            rigions: rigions.slice()
        };

        dispatch(filterWaterbases(filterPayload));

    };

    return (
        <div className="container">
            <Delivery__Map setRigionHandler={ setRigionHandler }/>
            <Delivery__Form rigionValue={ rigionValue }/>
        </div>
    );
}

export default Delivery;