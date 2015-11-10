<?php 
  include '_php/app.php';

  $post = new Post();

  if (RENDER_CONTENT_ONLY) {

    include partial('post/content');

  } else {

    include partial('head');
include partial('home/header');
    include partial('sidenav');
    include partial('post/content');
    include partial('foot');

  }
