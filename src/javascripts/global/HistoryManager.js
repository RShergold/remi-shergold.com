
import transition_to from './Transition'

function init(location) {
  
  location.observe((location) => {
    // when location window_path changes
    if (location.current.created_by === 'history') return
    if (location.current.window_path === location.previous.window_path) return
    history.pushState(null, 'RS', location.current.window_path);
  })

  window.addEventListener('popstate', () => {
    //when the broswer url changes
    location.change_to(document.location.pathname, 'history')
    transition_to(location)
  });
}

export default init
