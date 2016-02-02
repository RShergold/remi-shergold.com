<?php

define('RENDER_CONTENT_ONLY', isset($_GET['content_only']));

$db = new mysqli('localhost', '{{database.username}}', '{{database.password}}', '{{database.name}}');
$auth = new Auth('{{password_hash}}');

Nav::init();

//sanatize GET
array_walk($_GET, function(&$value, $key) use ($db){
  $value = $db->escape_string($value);
});

// helpers
function __autoload($class_name) {
  include_once dirname(__FILE__) . "/classes/$class_name.php";
}

function partial($name) {
  return dirname(__FILE__) . "/partials/$name.phtml";
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