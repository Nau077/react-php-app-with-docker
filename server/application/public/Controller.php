<?php
require_once 'Api.php';

class Controller extends Api
{
    public function indexWaterbases()
    {
        $string = file_get_contents("whaterbase.json");
        $json_a = json_decode($string, true);
        $users = $json_a;

        if ($users) {
            return $this->response($users, 200);
        } return $this->response('Data not found', 404);
    }

    public function indexRigions()
    {
        $string_b = file_get_contents("rigions.json");
        $json_b = json_decode($string_b, true);

        if ($json_b) {
            return $this->response($json_b, 200);
        }
        return $this->response('Данные регионов не найдены', 404);
    }

    public function createAction()
    {
        $data = $this->rawPostBody;
        $files = $_FILES;

        if ($files) {

            if (empty($_FILES['file']['size']))  print('Вы не выбрали файл');
            if ($_FILES['file']['size'] > (5 * 1024 * 1024)) print('Размер файла не должен превышать 5Мб');
            
            $imageinfo = getimagesize($_FILES['file']['tmp_name']);
            $arr = array('image/jpg','image/jpeg','image/gif','image/png','application/pdf');
            $isPdf = $_FILES['file']['type'] == 'application/pdf';

            if (!array_search($imageinfo['mime'],$arr) && !$isPdf) {
                echo ('Картинка должна быть формата JPG, GIF, PNG');
            } else {
                $upload_dir = 'files/'; 
                $name = $upload_dir.date('YmdHis').basename($_FILES['file']['name']);
                $mov = move_uploaded_file($_FILES['file']['tmp_name'],$name); 
            }
        }

        if ($data) {
            $additionalArray = json_decode($data['cool_data']);
            $data_results = file_get_contents('data.json');
            $tempArray = json_decode($data_results);
            $tempArray[] = $additionalArray;
            $jsonData = json_encode($tempArray, JSON_UNESCAPED_UNICODE);

            file_put_contents('data.json', $jsonData);

            return $this->response('Данные успешно отправлены', 200);
            } return $this->response('Не обнаружено отправленных данных', 404);
        }
    }
