### react + php + docker app

## install || установка

# Для развёртывания проекта cначала необходимо установить docker и docker-compose

Установка docker: https://docs.docker.com/engine/install/ <br/>
Установка docker-compose: https://docs.docker.com/compose/install/ <br/>

## start || запуск 
Для запуска в корне проекта друг за другом запустить следующиекоманды:<br/>
'make run/server', 'make build/client', make run/client<br/>

# docker-compose includes || Из чего состоит docker-compose 
Образ 'nginx:alpine' (конфигурационный файл лежит в 'server/sourcefiles/nginx')<br/>
Образ 'php-fpm' менеджера процессов FastCGI (FPM)<br/>
Также включен образ 'postgressql', но сама база пока никак не подключена к коду<br/>

# php часть
Для написания API не используются никакие фреймворки, нативный php.<br/>
В 'server/application/public' лежат: index.php - точка входа<br/>
index.php - точка входа<br/>
Api.php - маршрутизатор по роутам<br/>
Controller.php - записывает файлы/читает необходимые данные из файлов, отправляет запросы <br/>

# react часть
В client/src/components/core располагаются компоненты, принадлежащие сущностям, в нашем случае там сущность delivery <br/>
В client/src/components/custom располагаются компоненты, которые можно переиспользовать в разных сущностях<br/>
***
У приложения присутствует флакс-архитектура за счёт redux, в качестве middleware для асинхронной логики применяется redux-thunk <br/>
Для логирования к react-dev-tools подключён redux-logger<br/>
В /actions экшены, где проходит логика отправки запросов<br/>
***
В utils лежит конфиг axios baseUrl, константы экшенов и вынесенные функции-хелперы для валидации yup и схема валидации<br/>
Основная UI часть соответствует core/delivery и дочкам с delivery__form формой и дочкой картой delivery__map с картой с геокодером<br/>
delivery__form с delivery__map общаются между собой через общего родителя delivery<br/>
***
Основные используемые библиотеки: material-ui, react-yandex-maps, yup <br/>
***
ps Загружаемые файлы в форме не валидируются как обязательное поле для отправки<br/>
 