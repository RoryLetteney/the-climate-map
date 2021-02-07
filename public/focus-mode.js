const adjacencyList = edges.reduce((acc, curr) => {
  const nodes = curr.classList.value.split(' ');
  if (!acc[nodes[0]]) acc[nodes[0]] = [];
  acc[nodes[0]].push(nodes[1]);

  return acc;
}, {});

const startingNode = Object.entries(adjacencyList).find(([k, v]) => v.includes(undefined))[0];

const paths = [];
function buildStrings(list, next, path) {
  if (!list[next]) return paths.push(path);

  for (let e of list[next]) {
    if (!e) continue;
    let newPath = path || next;
    newPath += '->' + e;
    buildStrings(list, e, newPath);
  }
}

buildStrings(adjacencyList, startingNode);

function postData(paths){
  var w = window.open("page2.html");

  paths.forEach(p => w.document.write('<div>' + p + '</div>'));
}