<?php

class Files {

  function __construct($post_id) {

    preg_match('/^(\d+|_temp)$/', $post_id, $match);
    if (empty($match)) die('Invalid post ID');
    $this->directory = $_SERVER["DOCUMENT_ROOT"] . '/uploads/' . $match[0];
    $this->files = array_diff(scandir($this->directory), ['.','..']);
  }
  public function index() {

    print_r($this->files);
    return "this is an index " . $this->directory;
  }

  public function create() {
    return "this is an create";
  }

  public function destroy($file_name) {
    return "deleting file" . $file_name;
  }

}
