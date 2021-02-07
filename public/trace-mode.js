let currentTraceFunction = null;
let selectedNodes = [];
let updateSelectedNodesAttached = false,
    clearSelectedNodesAttached  = false;

function updateSelectedNodes(e, selectedNodes) {
  selectedNodes.push(e.target.classList);
  
  if (selectedNodes.length) {
    const { SHORTEST_PATH, ALL_PATHS, USER_DEFINED_PATH, NODE_TO_LEAF } = traceFunctions;

    if (currentTraceFunction === SHORTEST_PATH && selectedNodes.length === 2) {
      getShortestPath(selectedNodes);
      selectedNodes = [];
    } else if (currentTraceFunction === ALL_PATHS && selectedNodes.length === 2) {
      getPath(ALL_PATHS, selectedNodes);
      selectedNodes = [];
    } else if (currentTraceFunction === USER_DEFINED_PATH && selectedNodes.length >= 2) {
      getUserDefinedPath(selectedNodes);
    } else if (currentTraceFunction === NODE_TO_LEAF && selectedNodes.length === 1) {
      getNodeToLeaf(selectedNodes);
      selectedNodes = [];
    }
  }
}

function clearSelectedNodes(e) {
  if (e.target.tagName == 'svg') {
    selectedNodes = [];
  
    nodes.forEach(n => {
      n.style.opacity = '100%';
    });
  
    labels.forEach(l => {
      l.style.opacity = '100%';
    });
  
    edges.forEach(e => {
      e.style.opacity = '100%';
    });
  
    arrows.forEach(a => {
      a.style.opacity = '100%';
    });
  }
}

function cleanup(modeChange = false) {
  updateSelectedNodesAttached = false,
  clearSelectedNodesAttached  = false;

  clearSelectedNodes({ target: { tagName: 'svg' }});
  document.body.removeEventListener('click', clearSelectedNodes);

  nodes.forEach(n => {
    let clonedN = n.cloneNode(true);
    n.parentNode.replaceChild(clonedN, n);
    if (modeChange) n.addEventListener('click', focusModeClickHandler);
    n.style.opacity = '100%';
  });

  labels.forEach(l => {
    let clonedL = l.cloneNode(true);
    l.parentNode.replaceChild(clonedL, l);
    if (modeChange) l.addEventListener('click', focusModeClickHandler);
    l.style.opacity = '100%';
  });

  labels = Array.from(document.getElementsByTagName('text')),
  nodes = Array.from(document.getElementsByTagName('circle'));

  edges.forEach(e => {
    e.style.opacity = '100%';
  });

  arrows.forEach(a => {
    a.style.opacity = '100%';
  });

  toggleDisplayDegree(document.getElementById('display-degree'));
}

function updateCurrentTraceFunction(e, traceFunction) {
  selectedNodes = [];
  currentTraceFunction = traceFunction;

  tracingElements.forEach(element => {
    if (/active/.test(element.classList)) element.classList.remove('active');
  });
  e.classList.add('active');

  cleanup();

  // USED FOR SHORTEST_PATH, ALL_PATHS, NODE_TO_LEAF, AND USER_DEFINED_PATH
  if (!clearSelectedNodesAttached) {
    document.body.addEventListener('click', clearSelectedNodes);
  }
  if (!updateSelectedNodesAttached) {
    updateSelectedNodesAttached = true;
    nodes.forEach(n => {
      n.addEventListener('click', e => updateSelectedNodes(e, selectedNodes));
    });
    labels.forEach(l => {
      l.addEventListener('click', e => updateSelectedNodes(e, selectedNodes));
    });
  }
}
