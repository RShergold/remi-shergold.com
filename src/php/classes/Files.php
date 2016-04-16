<?php

class Files {

  function __construct($post_id) {

    set_error_handler('Files::error_handler'); 
    $this->dir_name = ((int)$post_id > 0) ? (int)$post_id : '_temp'; 
    $this->directory = $_SERVER["DOCUMENT_ROOT"] . '/uploads/' . $this->dir_name;
    $this->files = array_values(array_diff(scandir($this->directory), ['.','..']));
  }
  public function index() { 
    return $this->files;
  }

  public function create() {
    $message = 'Uploaded file: ';
    foreach ($_FILES as $file) {
      if ($file['error'] == UPLOAD_ERR_OK) {
        $temp_name = $file['tmp_name'];
        $name = Files::sanitise($file['name']);
        move_uploaded_file($temp_name, "$this->directory/$name");
        $message .= "$name ";
      }
    }
    return ['success'=>$message];
  }

  public function destroy($file_name) {
    $file_name = Files::sanitise($file_name);
    unlink("$this->directory/$file_name");
    return ['success'=>"deleted: $file_name"];
  }

  private static function error_handler($errno, $errstr) {
    http_response_code(400);
    die(json_encode(['error'=>$errstr]));
  }

  private static function sanitise($file_name) {
    return preg_replace('/[^\w\.\-\(\)]+/', '', $file_name);
  }
}
