<?php 
  include '_php/app.php';

  $section = new Section();
  if (RENDER_CONTENT_ONLY) {

    include partial('section/content');

  } else {

    include partial('head');
    include partial('sidenav');
    include partial('section/content');
    include partial('foot');

  }

