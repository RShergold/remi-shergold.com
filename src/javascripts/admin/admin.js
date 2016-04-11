

import {init_tabs} from './Tabs'
init_tabs('js-inputFrame')

import {
  init_growing_text_areas, 
  init_auto_slug
} from './Editor'

init_growing_text_areas()
init_auto_slug()

import {init_ajax_preview} from './Preview'
init_ajax_preview()
