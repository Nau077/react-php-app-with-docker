import { 
    GET_RIGIONS, 
    GET_WATERBASES, 
    FILTER_WATERBASES,
    ENABLE_LOADING,
    REQUEST_IN_SUCCESS,
    REQUEST_IN_FAILURE 
} from '../utils/ACTIONS_TYPES';
import API from "../utils/API";

const filterWaterBases = ({ rigion, rigions, waterBases }) => {
    let rigionId = '';

    const isRigionAvailable = rigions.map(el => {
        const isExist = true;

        if (el.area_names.includes(rigion)) {
            rigionId = el.uuid;
            return isExist; 
        }
        return !isExist;
    });

    if (!isRigionAvailable) {
        return;
    }
    // eslint-disable-next-line
    return waterBases.filter(el => el.region_uuid == rigionId);
};
 
export const sendFormData = (payload, resolve) => dispatch => {
 
    const coolData = {
        rigion: payload.rigion,
        waterbase: payload.waterbase,
        weight: payload.weight,
        adress: payload.adress,
        date: payload.date,
    };

    let formData = new FormData();

    formData.append('file', payload.upload);
    formData.append('cool_data', JSON.stringify(coolData));

    dispatch({ type: ENABLE_LOADING });

    API.post(
        'addData',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
        .then((res) => {
            if (res) dispatch({ type: REQUEST_IN_SUCCESS });
            resolve(res);
        })
        .catch(error => {
            console.error(error);
            dispatch({ type: REQUEST_IN_FAILURE });
        });
};

export const getRigions = () => dispatch => {
    dispatch({ type: ENABLE_LOADING });

    API.get('rigions')
        .then((response) => {
            const rigions =  response.data.data;
            dispatch({ type: GET_RIGIONS, payload: rigions });
            dispatch({ type: REQUEST_IN_SUCCESS });
        })
        .catch(e => {
            console.error(e);
            dispatch({ type: REQUEST_IN_FAILURE });
        });
};

export const getWaterbases = () => dispatch => {
    dispatch({ type: ENABLE_LOADING });

    API.get('waterbases')
        .then((response) => {
            const waterbases =  response.data.data;
            dispatch({ type: GET_WATERBASES, payload: waterbases });
            dispatch({ type: REQUEST_IN_SUCCESS });
        })
        .catch(e => {
            console.error(e);
            dispatch({ type: REQUEST_IN_FAILURE });
        });
};

export const filterWaterbases = (params) => dispatch => {
    
    const waterbases = filterWaterBases(params);
 
    dispatch({ type: FILTER_WATERBASES, payload: waterbases });
 
};
