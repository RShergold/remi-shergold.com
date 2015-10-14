<?php 
  include '_php/app.php';

  // do page setup

  include partial('head');
  include partial('home/header');
  include partial('sidenav');

  //setup first section
  $_GET['section'] = 'projects';
  $section = new Section();
  include partial('section/content');

  //setup second section
  $_GET['section'] = 'notes';
  $section = new Section();
  include partial('section/content');

  include partial('foot');

