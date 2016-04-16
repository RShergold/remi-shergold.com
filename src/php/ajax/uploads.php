<?php

  include '../app.php';
  //$auth->required();

  $files = new Files( @$_GET['post_id'] );
  $action = isset($_GET['action']) ? $_GET['action'] : 'index';
  $filename = @$_GET['filename'];

  if (in_array($action, ['index', 'create', 'destroy'])) {
    echo json_encode($files->$action($filename), JSON_PRETTY_PRINT);
  }
