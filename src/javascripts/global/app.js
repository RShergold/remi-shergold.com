

//script highlighting
hljs.initHighlightingOnLoad();

app.state = new State(location.pathname);
app.header.init();
app.side_nav.init();
app.scroll_manager.init();
