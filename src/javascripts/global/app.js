
/*
//script highlighting
hljs.initHighlightingOnLoad();

app.state = new State(location.pathname);
app.header.init();
app.side_nav.init();
app.scroll_manager.init();
*/

import './vendor/noframework.waypoints.js'

import Location from './Location'
import Banner from './Banner'
import SideNav from './SideNav'
import ScrollManager from './ScrollManager'

//create central state object
const app_location = new Location(location.pathname)

//init components
Banner(app_location)
SideNav(app_location)
ScrollManager(app_location)
