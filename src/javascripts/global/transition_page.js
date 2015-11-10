
class TransitionPage {

  to(path) {
    const new_state = app.state.create_for(path);
    const transition = this.transition_for(app.state.depth, new_state.depth);
    switch(transition) {
    case 'back':
      this.do_back(new_state);
      break;
    case 'forward':
      this.do_forward(new_state);
      break;
    case 'fade':
      this.do_fade(new_state);
      break;
    case 'scroll':
      this.do_scroll(new_state);
      break;
    default:
      // do nothing
    }
    app.state.update_to(new_state);
  }

  // do transitions
  do_back(new_state) {
    console.log("transition.do_back");
    app.stage.clear('is-exitingStageRight');
    app.page_content.get_page(new_state.active_path).then(
      (page_html)=> {
        const page_element = this.dom_element_for(page_html);
        page_element.classList.add('is-enteringStageLeft');
        app.stage.append_element_when_stage_is_clear(page_element);
      },
      (error)=> {
        console.log(error);
      }
    );
    //TODO if home render all sections!
    //show/hide header
  }

  do_forward(new_state) {
    console.log("transition.do_forward");
    //clear the stage
    app.stage.clear('is-exitingStageLeft');
    app.page_content.get_page(new_state.active_path).then(
      (page_html)=> {
        const page_element = this.dom_element_for(page_html);
        page_element.classList.add('is-enteringStageRight');
        app.stage.append_element_when_stage_is_clear(page_element);
      },
      (error)=> {
        console.log(error);
      }
    );
    //show/hide header
  }

  do_fade(new_state) {
    console.log("transition.do_fade");
    app.stage.clear('is-exitingFadingBack');
    app.page_content.get_page(new_state.active_path).then(
      (page_html)=> {
        const page_element = this.dom_element_for(page_html);
        page_element.classList.add('is-enteringFadingForward');
        app.stage.append_element_when_stage_is_clear(page_element);
      },
      (error)=> {
        console.log(error);
      }
    );
    //show/hide header
  }

  do_scroll(new_state) {
    console.log("transition.do_scroll");
    // if page on stage
      // scroll to page
    // else request page
      // show page
      // scroll to page
  }

  // transition parts
  clear_stage(transition) {
    const curret_pages = Array.from(this._stage.children)
    for (let page of curret_pages) {
      page.classList.add(transition)
    }
    setTimeout(()=>{
      for (let page of curret_pages) {
        page.parentElement.removeChild(page)
      }
    },1000);
  }

  // helpers
  transition_for(current_depth, new_depth) {
    let transition_map = {
      0: { 0: 'none', 1: 'scroll', 2: 'forward' },
      1: { 0: 'back', 1: 'fade', 2: 'forward' },
      2: { 0: 'back', 1: 'back', 2: 'scroll' }
    }
    return transition_map[current_depth][new_depth];
  }

  dom_element_for(html) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    return wrapper.firstChild;
  }

}