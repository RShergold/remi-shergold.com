
app.header.init();
app.side_nav.init();


// if browser can support then
  app.state = new State(location.pathname);
  app.content.init();

  app.click_manager.init();
  app.history_manager.init();
  app.scroll_manager.init();


