
//import vendor libraries
import './vendor/noframework.waypoints.js'

//to add/remove languages see ./vendor/highlight.js/index.js
import hljs from './vendor/highlight.js'
hljs.initHighlightingOnLoad()


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


