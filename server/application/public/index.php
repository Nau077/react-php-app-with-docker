<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');


require_once 'controller.php';
// require_once 'rigions.php';
require_once 'Api.php';

try {
    $controller = new Controller();
    // $apiRigions = new apiRigions();
    echo $controller->run();
    // echo $apiRigions->run();
} catch (Exception $e) {
    echo json_encode(Array('error' => $e->getMessage()));
}