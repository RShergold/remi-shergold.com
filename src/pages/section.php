<?php 
  include '_php/app.php';

  // do page setup

  include partial('head');
  include partial('sidenav');

  $section = new Section();
  include partial('section/content');

  include partial('foot');

