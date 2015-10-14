<?php

$db = new mysqli('localhost', 'root', 'root', 'remi-shergold.com'); //gitignore
$auth = new Auth('$1$NosrB39G$w3NClFveyrSSqqMKrLFOm1');             //gitignore

// helpers
function __autoload($class_name) {
  include_once getcwd() . "/_php/classes/$class_name.php";
}

function partial($name) {
  return getcwd() . "/_php/partials/$name.phtml";
}

function flash($key, $function) {
  if ( session_status()==2 && array_key_exists($key, $_SESSION) ) {
    $function( $_SESSION[$key] );
    unset($_SESSION[$key]);
  }
}
