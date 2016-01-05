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
    return ($this->slug == @$_GET['page'] );
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
    $db->query( $this->build_save_sql_string() );

    if ($db->errno) {
      $_SESSION['message'] = ['redStuck',"mysql error: $db->error"];
      die("/{$_GET['section']}");
    }
    $this->id = ($db->insert_id) ? $db->insert_id : intval($_POST['id']);
    //$this->save_images();

    $_SESSION['message'] = ['green','page saved'];
    header("Location: /{$_GET['section']}/{$_POST['slug']}");
    die();
  }

  private function delete_page() {
    global $db;

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

  private function save_images() {
    if ( !array_key_exists('images',$_FILES) ) { return; }

    $page_image_dir = getcwd() . "/_public/images/$this->id";
    if (!is_dir($page_image_dir)) {
      mkdir($page_image_dir);
    }
    foreach( $_FILES['images']['tmp_name'] as $image_name => $temp_file ) {
      // TODO sanatize image_name? what happens if i post a name of ../../img.jpg
      move_uploaded_file( $temp_file,  "$page_image_dir/$image_name");
    }
  }

  private function set_image_path() {
    //$this->image_path = empty($this->attributes['image']) ? false : "/_public/images/$this->id/$this->image";
    $this->image_path = empty($this->attributes['image']) ? false : $this->image;
  }

}