<?php 

  include '../app.php';
  $auth->required();
  
  if (isset($_POST['markdown'])) {
    $Parsedown = new Parsedown();
    echo $Parsedown->text($_POST['markdown'], $_POST['uploads_path']);
  }
