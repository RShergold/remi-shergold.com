

import {init_tabs} from './Tabs'
import {
  init_growing_text_areas, 
  init_auto_slug
} from './Editor'
import {init_ajax_preview} from './Preview'
import Files from './Files'


const form = document.getElementById('js-inputForm')

if (form) {
  init_tabs('js-inputFrame')
  init_growing_text_areas()
  init_auto_slug()
  init_ajax_preview()

  const post_id = form.elements['id'] ? form.elements['id'].value : '_temp' 
  const files = new Files(post_id)
  files.list()
}
