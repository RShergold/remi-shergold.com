var app = app || {};

app.stage = {

  stage_element: document.getElementById('js-stage'),

  stage_is_clear: false,
  pages_to_append: null,

  clear: function(transition) {
    app.scroll_manager.destroy_waypoints();
    const curret_pages = Array.from(this.stage_element.children)
    for (let page of curret_pages) {
      page.classList.add(transition)
    }
    setTimeout(()=>{
      for (let page of curret_pages) {
        page.parentElement.removeChild(page)
      }
      this.stage_is_clear = true;
      this._append_pages_when_stage_is_clear();
    },500);
  },

  add_page: function(html, tag_class) {

    const pages = document.createElement('div');
    pages.innerHTML = html;
    for (let i=0; i<pages.children.length; i++) {
      pages.children[i].classList.add(tag_class);
    }
    this._append_pages_when_stage_is_clear(pages.children);
  },

  _append_pages_when_stage_is_clear: function(pages) {

    this.pages_to_append = pages || this.pages_to_append;
    if (this.stage_is_clear && this.pages_to_append) {
      while (this.pages_to_append.length) {
        this.stage_element.appendChild(this.pages_to_append[0]);
      }
      app.scroll_manager.create_waypoints();
      this.pages_to_append = null;
      this.stage_is_clear = false;
    }
  }

  /*
  _append_element_when_stage_is_clear: function(new_element) {

    this.element_to_append = new_element || this.element_to_append;
    if (this.stage_is_clear && this.element_to_append) {
      this.stage_element.appendChild(this.element_to_append);
      app.scroll_manager.create_waypoints();
      this.element_to_append = null;
      this.stage_is_clear = false;
    } 
  }
  */

}




