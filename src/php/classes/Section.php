<?php

class Section {

  private $attributes = [];
  public $pages = [];

  function __construct($attributes = false) {
    if ($attributes)
      $this->attributes = $attributes;
    else
      $this->get_current();
  }

  public function __get($attribute_name) {
    return $this->attributes[$attribute_name];
  }

  public function is_current() {
    return ( $this->slug == @$_GET['section'] );
  }

  private function get_current() {
    global $db;

    $sql = "SELECT sections.name AS section_name, sections.description AS section_description, 
      pages.* FROM sections LEFT JOIN pages ON pages.section_slug = sections.slug
      WHERE sections.slug = '{$_GET['section']}' ORDER BY pages.created DESC";

    $result = $db->query( $sql );
    if (!$row = $result->fetch_assoc()) die('page not found');

    $this->attributes = get_section_attributes_from($row);

    do {
      if (!empty($row['slug'])) $this->pages[] = new Post($row);
    } while( $row = $result->fetch_assoc() );

  }

}