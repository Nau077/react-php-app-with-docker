import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
        maxWidth: 450,
        width: '100%', 
        fullWidth: true,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Delivery__Form_Select(props) {
    const classes = useStyles();

    const waterbasesMain = useSelector(state => state.waterBases.waterBasesList);
    const waterbases = useSelector(state => state.waterBases.wBfilterList);
    const rigions = useSelector(state => state.rigions.rigionList);
    const isLoading = useSelector(state => state.shared.isLoading);

    useEffect(() => {
        if (waterbases.length) {
            props.handleSelectChange(null, waterbases[0].name);
        } else {
            props.handleSelectChange('Не выбрана водобаза', '');
        }
        // eslint-disable-next-line
    }, [waterbasesMain, waterbases]);

    const handleChange = (event) => {

        props.handleSelectChange(null, event.target.value);
    };

    if (isLoading) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    if (!isLoading && waterbasesMain.length && !waterbases.length) {
        return (
            <div>
                <h2>В вашем регионе нет водобаз.</h2>
                <h3>Пожалуйста, кликните на карте на регион из списка ниже, где есть водобазы:</h3>
                <div>
                    { rigions.map(item => <p key={item.uuid } {...item} >{item.area_names[0]}, {item.area_names[1]}</p>) }
                </div>
            </div>
        );
    }

    return (
        <div> 
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Выберите водобазу</InputLabel>
                <Select
                    native
                    onChange={handleChange}
                    label={props.name}

                    inputProps={{
                        name: props.name,
                        id: 'age-native-simple',
                    }}
                >
                    { waterbases.map(item => <option key={item.uuid } {...item} value={item.name}>{item.name}</option>) }
                </Select>
            </FormControl>
        </div>
    );
}