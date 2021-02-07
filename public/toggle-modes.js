const modes = {
  FOCUS_MODE: 'Focus Mode',
  TRACE_MODE: 'Trace Mode'
}
const traceFunctions = {
  SHORTEST_PATH: 'shortest-path',
  ALL_PATHS: 'all-paths',
  USER_DEFINED_PATH: 'user-defined-path',
  NODE_TO_LEAF: 'node-to-leaf',
  NODE_SIMILARITY: 'node-similarity'
}
let currentMode = modes.FOCUS_MODE;
const tracingElements = Array.from(document.getElementsByClassName('tracing'));

tracingElements.forEach(e => e.style.display = 'none' );

function focusModeClickHandler(e) {
  const pattern = new RegExp(`(^|\-\>)${e.target.classList.value}($|\-\>)`);
  postData(paths.filter(p => pattern.test(p)));
}

function toggleMode() {
  if (currentMode === modes.FOCUS_MODE) {
    currentMode = modes.TRACE_MODE;
    document.getElementById('body').classList = 'trace-mode';
    tracingElements.forEach(e => e.style.display = /label/.test(e.classList) ? 'grid' : 'block');

    nodes.forEach(n => {
      n.removeEventListener('click', focusModeClickHandler);
    });
  
    labels.forEach(l => {
      l.removeEventListener('click', focusModeClickHandler);
    });
  } else {
    currentMode = modes.FOCUS_MODE;
    document.getElementById('body').classList = '';
    tracingElements.forEach(e => {
      e.style.display = 'none';
      e.classList.remove('active');
    });

    cleanup(true);
  }

  document.getElementById('toggle-mode').innerText = currentMode;
}

nodes.forEach(n => {
  n.addEventListener('click', focusModeClickHandler);
});

labels.forEach(l => {
  l.addEventListener('click', focusModeClickHandler);
});