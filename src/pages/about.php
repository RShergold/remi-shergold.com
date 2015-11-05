<?php 
  include '_php/app.php';

  if (RENDER_CONTENT_ONLY) {

    include partial('about/main');

  } else {

    include partial('head');
    include partial('sidenav');
    include partial('about/main');
    include partial('foot');
  }