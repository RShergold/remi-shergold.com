

class Files {

  constructor(post_id) {
    const resource_uri = `/uploads/${post_id}/`

    this.server_files = new ServerFiles(resource_uri)
    this.file_list = new FileList('js-fileList', resource_uri)

    this._init_file_selector()
    this._init_drag_and_drop()
  }

  list() {
    this.server_files.index()
      .then((files)=>{
        this.file_list.clear()
        for (let file_name of files) {
          this.file_list.add(file_name, this.delete.bind(this))
        }
      })
  }

  create(files) {
    this.server_files.create(files)
      .then((response)=>{
        console.log(response)
        this.list()
      })
  }

  delete(file_name) {
    this.server_files.destroy(file_name)
      .then((response)=>{
        console.log(response)
        this.list()
      })
  }


  //private
  _init_file_selector() {
    const file_input_element = document.getElementById('js-fileInput')
    file_input_element.onchange = () => {
      this.create(file_input_element.files)
    }
  }

  _init_drag_and_drop() {

    document.body.ondragover = (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    }
    document.body.ondrop = (e) => {
      e.stopPropagation()
      e.preventDefault()
      this.create(e.dataTransfer.files)
    }
  }


}


class FileList {

  constructor (element_id, resource_uri) {
    this.container = document.getElementById(element_id)
    this.resource_uri = resource_uri
  }

  clear() {
    this.container.innerHTML = ''
  }

  add(file_name, on_delete) {
    const preview = this._is_image(file_name) ? `<img class="SingleFile-image" src="${this.resource_uri}${file_name}">` : ''
    const entry = `
      <li class="SingleFile">
        <button class="SingleFile-delete" type="button">✕</button>
        ${preview}
        <p class="SingleFile-title">
          ${file_name}
        </p>
      </li>
    `
    const div = document.createElement('div')
    div.innerHTML = entry
    const deleteButton = div.getElementsByTagName('button')[0]
    deleteButton.onclick = ()=> on_delete(file_name)
    this.container.appendChild(div.firstElementChild)
  }

  //private
  _is_image(file_name) {
    const extensions = /\.(jpg|png|gif|bmp)$/i
    return extensions.test(file_name)
  }
}

class ServerFiles {

  constructor(resource_uri) {
    this.resource_uri = resource_uri
  }

  index() {
    return this._xhr_promise({
      url: this.resource_uri,
      method: 'GET'
    })
  }

  create(files) {
    const formData = new FormData();
    for (let i = 0, file; file = files[i]; ++i) {
      formData.append(file.name, file);
    }

    return this._xhr_promise({
      url: this.resource_uri,
      method: 'POST',
      formData
    })
  }

  destroy(file_name) {
    return this._xhr_promise({
      url: this.resource_uri + file_name,
      method: 'DELETE',
    })
  }

  //private 
  _error(status_code) {
    if (status == 400) {
      const response = JSON.parse(xhr.responseText)
      alert(response.error)
    } else {
      alert(`${status}: ${xhr.statusText}`)
    }
  }

  _xhr_promise(options) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const error_handler = this._error

      xhr.open(options.method, options.url)
      xhr.onload = function () {
        console.log(xhr.response)

        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          error_handler(this.status)
          reject()
        }
      };
      xhr.onerror = function () { 
        error_handler(this.status)
        reject()
      }
      xhr.send(options.formData);
    })
  }
}


export default Files
