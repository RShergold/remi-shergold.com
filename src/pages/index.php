<?php 
  include '_php/app.php';

  // do page setup
  $page = new Page();
  $page->isHomePage = true;

  if (RENDER_CONTENT_ONLY == false) {
    include partial('head');
    include partial('sidenav');
  }

  //setup first section
  $_GET['section'] = 'projects';
  $section = new Section();
  include partial('section/content');

  //setup second section
  $_GET['section'] = 'notes';
  $section = new Section();
  include partial('section/content');

  //about section
  include partial('about/main');

  if (RENDER_CONTENT_ONLY == false) {
    include partial('foot');
  }
