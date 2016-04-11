<?php

class Page {

  public $title = 'Remi Shergold';
  public $description = 'I\'m a web and mobile developer working in Brighton UK.';
  public $isHomePage = false;

  function __construct($root_object = null) {

    if ($root_object) {
      $this->title = "$root_object->title | $this->title";
      $this->description = strip_tags($root_object->description);
    }
  }

}
