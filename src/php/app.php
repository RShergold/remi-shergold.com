<?php

//sleep(7);
include_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config.php";

define('RENDER_CONTENT_ONLY', isset($_GET['content_only']));

$db = new mysqli('localhost', DB_USER, DB_PASSWORD, DB_NAME);
$auth = new Auth(PASSWORD_HASH);

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
