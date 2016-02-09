
import scroll_to from './ScrollTo'
import {clear_stage, add_to_stage} from './Stage'
import {get_page_for} from './Content'

function transition_to(location) {

  if (location.current.window_is_home() && location.previous.window_is_home() ){
    //transition within the homepage
    scroll_to(location)

  }else if (location.current.window_is_home() && location.previous.window_is_home() == false) {
    //transition to homepage from post or section
    clear_stage('is-exitingStageRight')
    get_page_for(location).then(
      (page_html) => {
        add_to_stage(page_html, 'is-enteringStageLeft')
      },
      (error) => {
        //TODO deal with error (may be network etc)
      }
    )
  }else if (location.current.content_is_post() && location.previous.content_is_post() === false) {
    //transition to a post from homepage or a section
    clear_stage('is-exitingStageLeft'); //current will move left
    get_page_for(location).then(
      (page_html) => {
        add_to_stage(page_html, 'is-enteringStageRight')
      },
      (error) => {
        //TODO deal with error (may be network etc)
      }
    )
  }else if (location.current.window_is_section() && location.previous.content_is_post()) {
    //transition to a section from a post
    clear_stage('is-exitingStageRight')
    get_page_for(location).then(
      (page_html) => {
        add_to_stage(page_html, 'is-enteringStageLeft')
      },
      (error) => {
        //TODO deal with error (may be network etc)
      }
    )
  }else if(location.current.window_is_section() && location.previous.window_is_section()) {
    //transition between sections
    clear_stage('is-exitingFadingBack')
    get_page_for(location).then(
      (page_html) => {
        add_to_stage(page_html, 'is-enteringFadingForward')
      },
      (error) => {
        //TODO deal with error (may be network etc)
      }
    )
  }

  

}





export default transition_to