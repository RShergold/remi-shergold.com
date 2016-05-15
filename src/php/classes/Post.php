<?php

class Post {

  private $attributes = [];

  function __construct($attributes = false) {

    if ($attributes) {
      $this->attributes = $attributes;
      $this->set_image_path();
      return;
    }
    switch (@$_POST['action']) {
    case 'save':
      $this->save_page();
      break;
    case 'delete':
      $this->delete_page();
      break;
    default: // get
      if (array_key_exists('page', $_GET))  $this->get_current();
    }
  }

  public function __get($attribute_name) {
    return @$this->attributes[$attribute_name];
  }

  public function __set($attribute_name, $attribute_value) {
    $this->attributes[$attribute_name] = $attribute_value;
  }

  public function is_current() {
    return $this->slug == @$_GET['page'];
  }

  public function src() {
    return "/$this->section_slug/$this->slug";
  }

  public function html_content() {
    $Parsedown = new Parsedown();
    return $Parsedown->text($this->content);
  }

  // Actions 
  private function get_current() {
    global $db;
    $result = $db->query(" SELECT * FROM pages WHERE slug='{$_GET['page']}' AND section_slug='{$_GET['section']}';");
    
    if ( !$this->attributes = $result->fetch_assoc() ) die ('page not found!');
    $this->set_image_path();
  }

  private function save_page() {
    global $db, $auth;
    
    $auth->required();
    //TODO what happens if i post an invalid slug?
    if ( empty($_POST['slug']) ) die('slug invalid');
    $db->query( $this->build_save_sql_string() );

    if ($db->errno) {
      $_SESSION['message'] = ['redStuck',"mysql error: $db->error"];
      die("/{$_GET['section']}");
    }
    if ($db->insert_id) {
      Files::create_dir_for_post($db->insert_id);
    }

    $_SESSION['message'] = ['green','page saved'];
    header("Location: /{$_GET['section']}/{$_POST['slug']}");
    die();
  }

  private function delete_page() {
    global $db, $auth;

    $auth->required();
    $db->query("DELETE FROM pages WHERE slug='{$_GET['page']}' AND section_slug='{$_GET['section']}'");
    $_SESSION['message'] = ['green','page deleted'];
    header("Location: /{$_GET['section']}");
    die();
  }

  // helpers
  private function build_save_sql_string() {
    global $db;

    // convert whitelist to sql values
    $sql_values = '';
    foreach(['title','slug','content','description'] as $key) {
      $sql_values .= $key . "='" . $db->escape_string($_POST[$key]) . "',";
    }
    $sql_values = rtrim($sql_values,',');

    if ( array_key_exists('id',$_POST) ) {
      $id = intval($_POST['id']);
      return "UPDATE pages SET $sql_values WHERE id=$id ";
    } else {
      return "INSERT INTO pages SET section_slug='{$_GET['section']}', $sql_values";
    }
  }

  private function set_image_path() {
    //$this->image_path = empty($this->attributes['image']) ? false : "/_public/images/$this->id/$this->image";
    $this->image_path = empty($this->attributes['image']) ? false : $this->image;
  }

}
