let labels = Array.from(document.getElementsByTagName('text')),
    nodes = Array.from(document.getElementsByTagName('circle'));
const edges = Array.from(document.getElementsByTagName('path')),
      arrows = Array.from(document.getElementsByTagName('polyline'));

let parentFill = '';
let nodeFill = '';

nodes.forEach(n => {
    nodeFill = n.style.fill;
    n.addEventListener('mouseover', () => {
      n.style.fill = 'rgba(103, 190, 217, 0.6)';
    });
    n.addEventListener('mouseleave', () => {
      n.style.fill = nodeFill;
    });
});

labels.forEach(l => {
  l.style.fontWeight = '600';
  let parentNode = nodes.find(n => n.classList.value === l.classList.value);
  if (parentNode) {
    parentFill = parentNode.style.fill;
    l.addEventListener('mouseover', () => {
      parentNode.style.fill = 'rgba(103, 190, 217, 0.6)';
    });
    l.addEventListener('mouseleave', () => {
      parentNode.style.fill = parentFill;
    });
  }
});