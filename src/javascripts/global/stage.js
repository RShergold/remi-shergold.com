
var app = app || {};

app.stage = {

  stage_element: document.getElementById('js-stage'),

  stage_is_clear: false,
  element_to_append: null,

  clear: function(transition) {
    const curret_pages = Array.from(this.stage_element.children)
    for (let page of curret_pages) {
      page.classList.add(transition)
    }
    setTimeout(()=>{
      for (let page of curret_pages) {
        page.parentElement.removeChild(page)
      }
      this.stage_is_clear = true;
      this.append_element_when_stage_is_clear();
    },500);
  
  },

  append_element_when_stage_is_clear: function(new_element) {
    this.element_to_append = new_element || this.element_to_append;

    if (this.stage_is_clear && this.element_to_append) {
      this.stage_element.appendChild(this.element_to_append);
      this.element_to_append = null;
      this.stage_is_clear = false;
    } 
  }

}




