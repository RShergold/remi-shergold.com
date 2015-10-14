<?php 
  include '_php/app.php';

  // do page setup

  include partial('head');
  include partial('sidenav');

  $post = new Page();
  include partial('post/content');
  
  include partial('post/content');

  include partial('foot');
