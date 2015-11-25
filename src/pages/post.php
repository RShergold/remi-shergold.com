<?php 
  include '_php/app.php';

  $post = new Post();
  $page = new Page($post);

  if (RENDER_CONTENT_ONLY) {

    include partial('post/content');

  } else {

    include partial('head');
    include partial('sidenav');
    include partial('post/content');
    include partial('foot');

  }
