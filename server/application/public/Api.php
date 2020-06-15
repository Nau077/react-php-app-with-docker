<?php

abstract class Api
{
    public $apiName = '';

    protected $method = ''; //GET|POST|PUT|DELETE

    public $requestUri = [];
    public $requestParams = [];

    protected $action = ''; //Название метода для выполнения

    public function __construct() {
        header("Access-Control-Allow-Orgin: *");
        header("Access-Control-Allow-Methods: *");
        header("Content-Type: application/json");
        $rawPostBody = $_POST;

        $this->requestUri = explode('/', trim($_SERVER['REQUEST_URI'],'/'));
        $this->requestParams = $_REQUEST;

        if ($rawPostBody) {
            $this->rawPostBody = $rawPostBody;
        }
            
        //Определение метода запроса
        $this->method = $_SERVER['REQUEST_METHOD'];
        if ($this->method == 'POST' && array_key_exists('HTTP_X_HTTP_METHOD', $_SERVER)) {
            if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'DELETE') {
                $this->method = 'DELETE';
            } else if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'PUT') {
                $this->method = 'PUT';
            } else {
                throw new Exception("Unexpected Header");
            }
        }
    }

    public function run() {
        //Определение действия для обработки
        $this->action = $this->getAction();

        //Если метод(действие) определен в дочернем классе API, то вызывать его
        if (method_exists($this, $this->action)) {
            return $this->{$this->action}();
        } else {
            throw new RuntimeException('Invalid Method', 405);
        }
    }

    protected function response($data, $status = 500) {
        header("HTTP/1.1 " . $status . " " . $this->requestStatus($status));
        return json_encode($data);
    }

    private function requestStatus($code) {
        $status = array(
            200 => 'OK',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            500 => 'Internal Server Error',
        );
        return ($status[$code])?$status[$code]:$status[500];
    }

    protected function getAction()
    {
        
        $method = $this->method;

        switch ($method) {
            case 'GET':
                if($this->requestUri && $_SERVER['REQUEST_URI'] == '/waterbases'){
                    return 'indexWaterbases';
                } else if($this->requestUri && $_SERVER['REQUEST_URI'] == '/rigions'){

                        return 'indexRigions';
                } else {
                    return $this->response('route not found', 404);
                }
                break;
            case 'POST':
                if($this->rawPostBody && $_SERVER['REQUEST_URI'] == '/addData')
                return 'createAction';
                break;
            default:
                return null;
        }
    }

    abstract protected function indexWaterbases();
    abstract protected function indexRigions();
    abstract protected function createAction();
}