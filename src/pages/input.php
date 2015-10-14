<?php
  include '_php/app.php';
  $auth->required();

  include partial('head');
  include partial('sidenav');
  include partial('post/content');
  include partial('foot');

