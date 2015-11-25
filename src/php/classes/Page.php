<?php

class Page {

  public $title = 'Remi Shergold';
  public $description = '';
  public $isHomePage = false;

  function __construct($root_object = null) {

    if (get_class($root_object) == 'Post') {
      $this->title = "$root_object->title | $this->title";
      $this->description = $root_object->excerpt;
    }
  }

}