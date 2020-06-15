import Delivery from './components/core/delivery/delivery';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getWaterbases, getRigions } from './actions/actions';
import './App.css';

function App() {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getWaterbases());
        dispatch(getRigions());
    }, [dispatch]);

    return (
        <div className="App">
            <Delivery/>
        </div>
    );
}

export default App;
