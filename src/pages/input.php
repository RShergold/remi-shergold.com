<?php
  include '_php/app.php';
  $auth->required();
  $post = new Post();
  $page = new Page($post);

/*
  echo '<pre>';
  print_r($post);
  print_r($page);
  echo '</pre>';
*/

  include partial('head');
  include partial('sidenav');
  include partial('post/content');
  include partial('foot');

