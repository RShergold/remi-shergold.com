<?php

  include '../app.php';
  //$auth->required();

  $files = new Files( @$_GET['post_id'] );
  $action = isset($_GET['action']) ? $_GET['action'] : 'index';
  $filename = @$_GET['filename'];

  if (method_exists($files, $action)) {
    echo $files->$action($filename);
  }
