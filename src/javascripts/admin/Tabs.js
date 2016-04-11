

function init_tabs(input_frame_id) {

  const input_frame = document.getElementById('js-inputFrame');

  if ('r_markdown' in window) {
    r_markdown.onchange = r_preview.onchange = r_description.onchange = (event) => {
      input_frame.className = 'Input is-showing-' + event.target.id.slice(2);
    }
  }

}

export {init_tabs}
