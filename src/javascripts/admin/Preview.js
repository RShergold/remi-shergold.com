

function init_ajax_preview(uploads_dir) {

  const preview_button = document.getElementById('js-getMarkdownPreview'),
      preview_frame = document.getElementById('js-preview'),
      input_form = window['js-inputForm'],
      markdown_input = input_form.elements['content'];

  const preview_downloaded = (event) => {
    preview_frame.innerHTML = event.srcElement.responseText;
  }

  const get_preview = () => {

    const data = new FormData();
    data.append('markdown', markdown_input.value);
    data.append('uploads_path', `/uploads/${uploads_dir}/`);

    const xhr = new XMLHttpRequest();
    xhr.onload = preview_downloaded;
    xhr.open('POST', '/ajax/markdown', true);
    xhr.send(data);
  }

  if (preview_button) {
    preview_button.onmouseenter = get_preview;
  }

}

export {init_ajax_preview}
