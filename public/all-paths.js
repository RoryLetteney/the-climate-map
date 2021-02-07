function findPaths(...selectedNodes) {
  let nodePaths = [];
  const pattern = new RegExp(`${[...new Set(...selectedNodes)].map(n => '(?=.*' + n + ')').join('')}.*`, 'i');
  
  paths.forEach(p => {
    if (pattern.test(p)) nodePaths.push(p.split('->'));
  });
  
  nodePaths.sort((a,b) => a.length - b.length);
  return nodePaths;
}

function buildEdgesFromPaths(paths) {
  let edges = [];
  
  for (let i = 0; i < paths.length; i++) {
    if (Array.isArray(paths[i])) {
      let nestedEdges = [];
      
      for (let j = 0; j < paths[i].length; j++) {
        if (!paths[i][j + 1]) break;
        
        nestedEdges.push(`${paths[i][j]} ${paths[i][j + 1]}`);
      }
      
      edges.push(nestedEdges);
    } else {
      if (!paths[i + 1]) break;
      edges.push(`${paths[i]} ${paths[i + 1]}`);
    }
  }

  return edges;
}

function showErrorMessage(pathType) {
  let button = null, offsetTop = 0;
  button = document.getElementById(pathType);

  if (button) offsetTop = button.offsetTop;
  
  const errorMessage = document.getElementById('error-message');
  errorMessage.innerText = 'No paths found.';
  errorMessage.style.top = `${offsetTop + 60}px`;
  errorMessage.classList.add('active');
  setTimeout(() => {
    errorMessage.classList.remove('active');
  }, 1000);

  nodes.forEach(n => {
    n.style.opacity = '10%';
  });

  labels.forEach(l => {
    l.style.opacity = '10%';
  });

  edges.forEach(e => {
    e.style.opacity = '10%';
  });

  arrows.forEach(a => {
    a.style.opacity = '10%';
  });
}

function getPath(pathType, selectedNodes) {
  let pathNodes = findPaths(...selectedNodes), pathEdges = null;
  if (pathType === traceFunctions.SHORTEST_PATH) pathNodes = pathNodes.filter(pn => pn.length === pathNodes[0].length);
  if (pathNodes.length) pathEdges = buildEdgesFromPaths(pathNodes).flat();
  
  if (pathEdges && pathEdges.length) {
    const slicedPathNodes = new Set();
    for (let i = 0; i < pathNodes.length; i++) {
      let idxNodes = selectedNodes.map(sn => pathNodes[i].indexOf(sn.value));
      if (pathType === traceFunctions.NODE_TO_LEAF) pathNodes[i].slice(idxNodes[0]).forEach(n => slicedPathNodes.add(n));
      else pathNodes[i].slice(Math.min(...idxNodes), Math.max(...idxNodes) + 1).forEach(n => slicedPathNodes.add(n));
    }
    
    const filteredPathEdges = pathEdges.filter(e => {
      const splitE = e.split(' ');
      return slicedPathNodes.has(splitE[0]) && slicedPathNodes.has(splitE[1]);
    });

    if (filteredPathEdges.length) {
      nodes.forEach(n => {
        if (!slicedPathNodes.has(n.classList.value)) n.style.opacity = '10%';
        else n.style.opacity = '100%';
      });
  
      labels.forEach(l => {
        if (!slicedPathNodes.has(l.classList.value)) l.style.opacity = '10%';
        else l.style.opacity = '100%';
      });
  
      edges.forEach(e => {
        if (!filteredPathEdges.includes(e.classList.value)) e.style.opacity = '10%';
        else e.style.opacity = '100%';
      });
  
      arrows.forEach(a => {
        if (!filteredPathEdges.includes(a.classList.value)) a.style.opacity = '10%';
        else a.style.opacity = '100%';
      });
    } else showErrorMessage(pathType);
  } else showErrorMessage(pathType);
}
