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
