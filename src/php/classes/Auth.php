<?php

class Auth {

  function __construct( $hash ) {

    $password = @$_POST['pwd'];
    if ( isset($_COOKIE["PHPSESSID"]) || $password ) session_start();

    if ( $password && password_verify($password,$hash) )
      $_SESSION = [
        'authorised'=> 1,
        'message' => ['green','signed in']
      ];
    elseif ($password) {
      $_SESSION['message'] = ['red','wrong password'];
      $this->show_signin_form();
    }
  }

  public function is_admin() {
    return @$_SESSION['authorised'];
  }

  public function required() { 
    if ( !$this->is_admin() ) {
      if (session_status()==1) session_start();
      $_SESSION['message'] = ['red','signin needed'];
      $this->show_signin_form();
    }
  }

  private function show_signin_form() {
    $_SESSION['sign_in'] = $_SERVER['REQUEST_URI'];
    header('Location: '. dirname($_SERVER['REQUEST_URI']) );
    die();
  }

}