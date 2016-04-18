<?php

  include '../app.php';
  //$auth->required();

  $files = new Files( @$_GET['post_id'] );
  $filename = @$_GET['filename'];
  $method = $_SERVER['REQUEST_METHOD'];
  $actions = [
    'GET' => 'index',
    'POST' => 'create',
    'DELETE' => 'destroy',
  ];

  echo json_encode( $files->{$actions[$method]}($filename) );
/*
  if ($action == 'destroy'){
    print_r($_SERVER['REQUEST_METHOD']);
    die();
  }

  if (in_array($action, ['index', 'create', 'destroy'])) {
    echo json_encode($files->$action($filename), JSON_PRETTY_PRINT);
  }
*/
