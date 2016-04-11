//to add/remove languages see ./vendor/highlight.js/index.js
import highlightJS from './vendor/highlight.js'

import {create_waypoints, destroy_waypoints} from './ScrollManager'
import scroll_to from './ScrollTo'

//TODO this is global state. What do?
var stage_element = null
var pages = {}
var stage_is_clear = false
var pages_to_append = null

function init_stage(element) {
  stage_element = element
  update_list_of_pages_on_stage()
}

function clear_stage(transition_class) {
  destroy_waypoints()
  for (let path in pages) {
    pages[path].classList.add(transition_class);
  }
  setTimeout(()=>{
    for (let path in pages) {
      stage_element.removeChild(pages[path]);
      delete pages[path];
    }
    stage_is_clear = true;
    append_pages_when_stage_is_clear();
  },500);

}

function add_to_stage(html, transition_class) {

  const new_pages = document.createElement('div')
  new_pages.innerHTML = html

  for (let i=0; i<new_pages.children.length; i++) {
    new_pages.children[i].classList.add(transition_class);
  }
  append_pages_when_stage_is_clear(new_pages.children);
}

function append_to_stage(html, position) {
  const new_page = document.createElement('div')
  new_page.innerHTML = html
  const page_below = find_page_below(position)
  stage_element.insertBefore(new_page.children[0], page_below)
  update_list_of_pages_on_stage()
}


function stage_contains(location) {
  return !!pages[location.current.content_path]
}


// Private functions
function append_pages_when_stage_is_clear(pages) {
  pages_to_append = pages || pages_to_append

  if (stage_is_clear && pages_to_append) {
    
    //TODO these two lines feel clunky
    window.scrollTo(0,0)
    document.title = pages_to_append[0].dataset.title + ' | Remi Shergold'

    while (pages_to_append.length) {
      stage_element.appendChild(pages_to_append[0])
    }
    update_list_of_pages_on_stage()
    create_waypoints();
    pages_to_append = null
    stage_is_clear = false
  } 
}

function update_list_of_pages_on_stage() {
  const dom_pages = stage_element.querySelectorAll('[data-path]')
  for (let i=0; i<dom_pages.length; i++) {
    const page_path = dom_pages[i].dataset.path
    if (page_path in pages == false) {
      ensure_correct_rendering_of_page(dom_pages[i])
    }
    pages[page_path] = dom_pages[i]
  }

}

function ensure_correct_rendering_of_page(page_element) {
  // if the page has a codeblock, run santax highlighting
  const code_blocks = page_element.querySelectorAll('pre code')
  let i = code_blocks.length
  while (i--) {
    highlightJS.highlightBlock(code_blocks[i])
  }

  //proper rendering of JS bin 
  const jsbinScriptElement = page_element.querySelector("script[src^='http://static.jsbin.com/js/embed.min.js']")
  if (jsbinScriptElement) {
    //mark parent as jsbinContainer
    jsbinScriptElement.parentElement.classList.add('is-jsbinContainer')
    //reload script.
    window.jsbinified = undefined
    const newScript = document.createElement('script')
    newScript.src = jsbinScriptElement.src
    jsbinScriptElement.parentElement.replaceChild(newScript, jsbinScriptElement)
  }

  //mark image containers
  const content_image_elements = page_element.querySelectorAll('.Content p img')
  i = content_image_elements.length
  while (i--) {
    const image_container = content_image_elements[i].parentElement,
          image_count = image_container.getElementsByTagName('img').length
    image_container.setAttribute('imagecount', image_count)
  }

}

function find_page_below(position) {
  position = Number(position)
  let page_below = null

  for (let path in pages) {
    const page_position = Number(pages[path].dataset.created)
    if (page_position < position) {
      //this page is below 'position'
      if (page_below) {
        if (page_position > Number(page_below.dataset.created)) {
          //this page is above the current 'page_below' page
          page_below = pages[path]
        }
      } else {
        page_below = pages[path]
      }
    }
  }
  return page_below
}


var loading_element = document.createElement('div');
loading_element.className = 'Loading'; 

export default {

  init: init_stage,
  replace_pages_with: add_to_stage,
  append_page: append_to_stage,
  clear: clear_stage,
  contains: stage_contains,

  loading: {
    attach: function() {
      stage_element.appendChild(loading_element)
      loading_element.classList.add('Loading--fixed')
    },
    attachAt: function(position) {
      const page_below = find_page_below(position)
      loading_element.classList.add('Loading--inline')
      stage_element.insertBefore(loading_element, page_below)
      scroll_to(loading_element)
    },
    remove: function() {
      stage_element.removeChild(loading_element)
      loading_element.className = 'Loading'
    }
  },
}
