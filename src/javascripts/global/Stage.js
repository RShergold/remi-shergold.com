import {create_waypoints, destroy_waypoints} from './ScrollManager'

//TODO this is global state. What do?
var stage_element = null
var pages = {}
var stage_is_clear = false
var pages_to_append = null

function init_stage(element) {
  stage_element = element
  update_list_of_pages_on_stage()
}

function update_list_of_pages_on_stage() {
  const dom_pages = stage_element.querySelectorAll('[data-path]')
  for (let i=0; i<dom_pages.length; i++) {
    pages[dom_pages[i].dataset.path] = dom_pages[i]
  }
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



export {init_stage, clear_stage, add_to_stage}