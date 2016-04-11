<?php
  include '_php/app.php';
  $auth->required();
  $post = new Post();
  $page = new Page($post);

  define('NEW_POST', isset($_GET['new']));

  if (NEW_POST) {
    $page->title = "new post";
  }

  include partial('head');
  include partial('sidenav');
  include partial('input/content');
  include partial('foot');
