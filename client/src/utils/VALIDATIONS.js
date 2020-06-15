import * as Yup from "yup";

export const schema = Yup.object().shape({
    weight: Yup.string("Введите ваш вес")
        .required("Вес - обязательное поле"),
    adress: Yup.string("")
        .min(8, "Адрес должен состоять минимум из 8 символов")
        .required("Адрес - обязательное поле"),
    date: Yup.string("Введите дату")
        .required("Дата - обязательное поле")
        .test("Формат", "Некорректный формат даты", 
            function(value) {
                if (value === "Invalid Date") return false;
                return true;
            })
        .nullable(),
    waterbase: Yup.string("Необходимо выбрать водобазу")
        .required("водобаза - обязательное поле")
        .nullable()
});
// функция конвертации превращает формат, кот. используется в yup, в более простой формат с объектом ~ { errors : [{path: _message}] }
export const convert = (errors) => {
    return errors.inner.reduce((z, item) => {
        return z[item.path] ? z : { ...z, [item.path] : item.message };
    }, {});
};

export const schemaValidate = (name, value) => {
    // обращаемся в [name] и [value] к конкретному полю валидируемого значения
    // abortEarly : true означает, что первая ошибка останавливает валидацию, мы этого не делаем
    return schema.validateAt(name, { [name] : value }, { abortEarly : false })
        .then(_ => ({ [name]: null })) // позволяет затирать ошибки по мере их исправления
        .catch(convert);
};   