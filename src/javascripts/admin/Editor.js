

function init_growing_text_areas() {

  const textareas = document.querySelectorAll('textarea[data-min-height]');

  const on_change = function() {
    
    this.style.height = '1px';

    const new_height = (this.scrollHeight > this.dataset.minHeight) 
              ? this.scrollHeight 
              : this.dataset.minHeight;

    this.style.height = new_height + 'px';
  }


  for (var i=0; i<textareas.length; i++) {
    textareas[i].oninput = on_change;
    on_change.bind(textareas[i])();
  }

}

export {init_growing_text_areas}
