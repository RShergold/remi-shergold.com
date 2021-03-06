
//import vendor libraries
import './vendor/noframework.waypoints.js'

//create central state object
import Location from './LocationState'
const app_location = new Location(location.pathname)

//stateful componenets
import Stage from './Stage'
Stage.init(document.getElementById('js-stage'))

import {init_content} from './Content'
init_content(document.getElementById('js-stage'))

//init components
import ScrollManager from './ScrollManager'
ScrollManager(app_location)

import ClickManager from './ClickManager'
ClickManager(app_location)

import HistoryManager from './HistoryManager'
HistoryManager(app_location)//???

import Banner from './Banner'
Banner(app_location)

import SideNav from './SideNav'
SideNav(app_location)

import MobileHeader from './MobileHeader'
MobileHeader(app_location)
