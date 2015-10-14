<?php

$db = new mysqli('localhost', 'root', 'root', 'remi-shergold.com'); //gitignore
$auth = new Auth('$1$NosrB39G$w3NClFveyrSSqqMKrLFOm1');             //gitignore

Nav::init();

//sanatize GET
array_walk($_GET, function(&$value, $key) use ($db){
  $value = $db->escape_string($value);
});

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

function get_section_attributes_from($row) {
  $attributes = [];
  array_walk($row,function($v, $k) use (&$attributes) {
    if ( preg_match("/^section_(.+)/",$k,$matches) ) $attributes[$matches[1]] = $v;
  });
  return $attributes;
}