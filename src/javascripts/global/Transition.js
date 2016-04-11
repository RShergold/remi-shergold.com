
import scroll_to from './ScrollTo'
import Stage from './Stage'
import {get_page_for} from './Content'

function transition_to(location) {

  if (location.current.window_is_home() && location.previous.window_is_home() ){
    //transition within the homepage
    scroll_to(location)

  }else if (location.current.window_is_home() && location.previous.window_is_home() == false) {
    //transition to homepage from post or section
    Stage.clear('u-MoveOut--right')
    Stage.loading.attach()
    get_page_for(location).then(
      (page_html) => {
        Stage.loading.remove()
        Stage.replace_pages_with(page_html, 'u-MoveIn--left')
      },
      (error) => {
        //TODO deal with error (may be network etc)
      }
    )
  }else if (location.current.content_is_post() && location.previous.content_is_post() === false) {
    //transition to a post from homepage or a section
    Stage.clear('u-MoveOut--left')
    Stage.loading.attach()
    get_page_for(location).then(
      (page_html) => {
        Stage.loading.remove()
        Stage.replace_pages_with(page_html, 'u-MoveIn--right')
      },
      (error) => {
        //TODO deal with error (may be network etc)
      }
    )
  }else if (location.current.window_is_section() && location.previous.content_is_post()) {
    //transition to a section from a post
    Stage.clear('u-MoveOut--right')
    Stage.loading.attach()
    get_page_for(location).then(
      (page_html) => {
        Stage.loading.remove()
        Stage.replace_pages_with(page_html, 'u-MoveIn--left')
      },
      (error) => {
        //TODO deal with error (may be network etc)
      }
    )
  }else if(location.current.window_is_section() && location.previous.window_is_section()) {
    //transition between sections
    Stage.clear('u-MoveOut--up')
    Stage.loading.attach()
    get_page_for(location).then(
      (page_html) => {
        Stage.loading.remove()
        Stage.replace_pages_with(page_html, 'u-MoveIn--up')
      },
      (error) => {
        //TODO deal with error (may be network etc)
      }
    )
  }else if (location.current.content_is_post() && location.previous.content_is_post()) {
    //transition between posts
    if (Stage.contains(location)) {
      scroll_to(location)
    } else {
      Stage.loading.attachAt( location.current.position )
      get_page_for(location).then(
        (page_html) => {
          Stage.loading.remove()
          Stage.append_page(page_html, location.current.position)
          scroll_to(location)
          //replace_placeholder_with(page_html)
        },
        (error) => {
          //TODO deal with error (may be network etc)
        }
      )
    }

  }

}


export default transition_to
