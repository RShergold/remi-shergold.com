

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

function init_auto_slug() {

  const slug_input = document.getElementById('js-slug');
  const title_input = document.getElementById('js-title');

  if (!slug_input || slug_input.value.length) return // only auto slug if there is no slug already

  title_input.oninput = () => {
    slug_input.value = title_input.value.replace(/[^a-z0-9]+/g, '-');
  }

}

export {init_growing_text_areas, init_auto_slug}
