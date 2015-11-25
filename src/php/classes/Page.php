<?php

class Page {

  public $title = 'Remi Shergold';
  public $description = 'I work for Hatch making web and mobile apps';
  public $isHomePage = false;

  function __construct($root_object = null) {

    if ($root_object) {
      $this->title = "$root_object->title | $this->title";
      $this->description = strip_tags($root_object->description);
    }
  }

}