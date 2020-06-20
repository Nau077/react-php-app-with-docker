import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendFormData } from '../../../../actions/actions';
import { schema, convert, schemaValidate } from '../../../../utils/VALIDATIONS';

import Delivery__Form_Select from './delivery__form-select';
import Delivery__Form_Upload from './delivery__form-upload';
import Delivery__Form_Format from './delivery__form-format';
import SnackBarWrapper from '../../../custom/SnackBarWrapper';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import blue from "@material-ui/core/colors/blue";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

 
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

  
const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: 275,
    },
    button: {
        color: blue[900],
        margin: 10
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 240,
            maxWidth: 450,
            width: '100%',
            textField: {
                flexBasis: 200,
                textField: {
                    marginLeft: theme.spacing(1),
                    marginRight: theme.spacing(1),
                },
            },
        },
    },
}));

function Delivery__Form(props) {
 
    const dispatch = useDispatch();
    // values - объекьт значений полей формы
    // errors - объект ошибок валидации формы
    const [formState, setFormState] = useState({
        values: {
            rigion: '',
            waterbase: '',
            weight: '',
            adress: '',
            date: new Date(),
            upload: ''
        },
        errors: null
    });
    // контроль за состоянием компонента snackbar
    // метод openSnackbar срабатывает только при успешной отправке формы
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpenSnackbar(false);
    };
    // при изменении города по клику на карте, получаем новое значение в props
    // => должны поменять состояние формы
    useEffect(() => {
        setFormState(state => ({
            values: { ...state.values, rigion: props.rigionValue },
            errors: { ...state.errors }
        }));
    }, [props]);
    
    const handleChangeForm = async (event) => {
        const { target : { name, value } } = event;

        if (name == 'weight' && formState.values[name].toString().charAt(0) == '.') {
            setFormState( state => ({
                values: { ...state.values, [name] : '' },
                errors: { ...state.errors }
            })
            );
            return;
        }
 
        const errors = await schemaValidate(name, value);
        
        setFormState(state => ({
            values: { ...state.values, [name]: value },
            errors: { ...state.errors, ...errors }
        }));
    };


    const handleDateChange = name => value => {
        
        (async function errors() {
            const errors = await schemaValidate(name, value);

            setFormState( state => ({
                values: { ...state.values, [name] : value },
                errors: { ...state.errors, ...errors }
            })
            );
        }());
     
    };
      
    const handleSelectChange = (message, value) => {
        setFormState({
            values: { ...formState.values, waterbase : value },
            errors: { ...formState.errors, waterbase: message }
        });
    };

    const handleUploadFile = value => {
        setFormState({
            values: { ...formState.values, upload : value },
            errors: { ...formState.errors }
        });
    };

    const handleSubmit = (callback) => {
        return async function (event) {
            event.preventDefault();
            // валидация в данном случае идёт по всей схеме
            const errors = await schema.validate(formState.values, { abortEarly : false })
            // ф-ция возвращает null, поэтому нужен пустой объект, чтобы сбросить объект ошибок состояния
            // если ошибок нет
                .then(_ => ({})) 
                .catch(convert);

            setFormState(state => ({
                values: { ...state.values },
                errors
            }));
      
            const isError = () => Object.entries(errors);

            if (!isError().length) {
                callback(formState.values);
            }
        };
    };

    const sendForm = (form) => {
        new Promise((resolve) => {
            dispatch(sendFormData(form, resolve));
        })
            .then(() => {
                setOpenSnackbar(true);
                setFormState(state => ({
                    values: {
                        ...state.values,
                        weight: '',
                        adress: '',
                        date: new Date(),
                        upload: ''
                    },
                    errors: {
                        ...state.errors
                    }
                }))
               setTimeout(() => {
                setFormState(state => ({
                    values: {
                        ...state.values,
                    },
                    errors: {
                    }
                })) 
               }, 0);
            })
    };

    const getError = (state, prop) => {
        const isFormError = true;

        if (state.errors[prop]) return isFormError;
        return !isFormError;
    };

    const classes = useStyles();

    return (
        <div className="form-container"> 
            <Card className={classes.card}>
                <CardContent> {
                    !props.rigionValue ? <CircularProgress />  :
                        <div className="form-wrapper">
                
                            <form className={classes.root} autoComplete="off" onSubmit={handleSubmit(form => {
                                sendForm(form);
                            })}>
                                <TextField 
                                    id="standard-required1" 
                                    label="Ваш регион"
                                    className={classes.textField}
                                    value={props.rigionValue}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <Delivery__Form_Select handleSelectChange={handleSelectChange} name={formState.waterbase}/>
                                {formState.errors && formState.errors.waterbase &&
        <div>
            <p className="waterbase-error">Поле водобазы необходимо выбрать</p>
        </div>
                                }
                                <TextField 
                                    name="weight"
                                    id="standard-required2"
                                    label="Вес воды (тонны)"
                                    className={classes.textField}
                                    value={formState.values.weight}
                                    onChange={handleChangeForm}
                                    helperText={formState.errors.weight ? formState.errors.weight : ""}
                                    error={ getError(formState, 'weight')}
                                    InputProps={{
                                        inputComponent: Delivery__Form_Format,
                                        endAdornment: <InputAdornment position="end">T</InputAdornment>,
                                    }}
                                />
                                <TextField
                                    name="adress"
                                    label="Напишите адрес"
                                    value={formState.values.adress}
                                    onChange={handleChangeForm}
                                    fullWidth
                                    error={ getError(formState, 'adress')}
                                    helperText={formState.errors.adress ? formState.errors.adress : ""}
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Выберите дату доставки"
                                        value={formState.values.date}
                                        onChange={handleDateChange('date')}
                                        helperText={formState.errors.date ? formState.errors.date : ""} 
                                        error={ getError(formState, 'date')}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                <Delivery__Form_Upload handleUploadFile={handleUploadFile}/>
                                <Button variant="outlined" className={classes.button} type="submit">
            Отправить
                                </Button>
                            </form>
                        </div>
                }
               
                </CardContent>
            </Card>
         
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <SnackBarWrapper
                    onClose={handleCloseSnackbar}
                    variant="success"
                    message="Форма успешно отправлена"
                />
            </Snackbar>
        </div>
    );
}

Delivery__Form.propTypes = {
    rigionValue: PropTypes.string,
};

export default Delivery__Form;