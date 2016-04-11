

function init_ajax_preview() {

  const preview_button = document.getElementById('js-getMarkdownPreview'),
      markdown_input = document.getElementById('js-markdown'),
      preview_frame = document.getElementById('js-preview');

  const preview_downloaded = (event) => {
    preview_frame.innerHTML = event.srcElement.responseText;
  }

  const get_preview = () => {
    const data = new FormData();
    data.append('markdown', markdown_input.value);

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
