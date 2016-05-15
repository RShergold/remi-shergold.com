<?php

switch (getenv("APP_ENVIRONMENT")) {
case 'production':

  define('DB_NAME', 'remi-shergold.com');
  define('DB_USER', 'root');
  define('DB_PASSWORD', 'root');
  define('PASSWORD_HASH', '$1$NosrB39G$w3NClFveyrSSqqMKrLFOm1');
  break;

default:
  define('DB_NAME', 'remi-shergold.com');
  define('DB_USER', 'root');
  define('DB_PASSWORD', 'root');
  define('PASSWORD_HASH', '$1$NosrB39G$w3NClFveyrSSqqMKrLFOm1');
}
