
/*
//script highlighting
hljs.initHighlightingOnLoad();

app.state = new State(location.pathname);
app.header.init();
app.side_nav.init();
app.scroll_manager.init();
*/

import './vendor/noframework.waypoints.js'


//create central state object
import Location from './Location'
const app_location = new Location(location.pathname)

//init components
import Banner from './Banner'
Banner(app_location)

import SideNav from './SideNav'
SideNav(app_location)

import MobileHeader from './MobileHeader'
MobileHeader(app_location)

import ScrollManager from './ScrollManager'
ScrollManager(app_location)
