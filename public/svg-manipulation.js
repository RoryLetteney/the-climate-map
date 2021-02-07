function changeSvgViewBox(svg) {
  if (svg) {
    const correctedVal = svg.viewBox.baseVal;
    const newX = (correctedVal.x * 1/3) + correctedVal.x;
    const newY = (correctedVal.y * 1/3) + correctedVal.y;
    correctedVal.width += Math.abs(newX);
    correctedVal.height += Math.abs(newY);
    correctedVal.x = newX;
    correctedVal.y = newY;
    svg.viewBox.baseVal = correctedVal;
    svg.viewBox.animVal = correctedVal;
    svg.width = correctedVal.width;
    svg.height = correctedVal.height;
  }
}

const svg = document.getElementsByTagName('svg')[0];
changeSvgViewBox(svg);

let scale = 1;
const zoomInButton = document.getElementById('zoom-in');
zoomInButton.addEventListener('click', () => {
  if (scale < 3) {
    scale += 0.25;
    svg.setAttribute('transform', `scale(${scale})`);
    svg.setAttribute('transform-origin', `${0 + scale * 100}px ${0 + scale * 100}px`);
  }
});

const zoomOutButton = document.getElementById('zoom-out');
zoomOutButton.addEventListener('click', () => {
  if (scale > 0) {
    scale -= 0.25;
    svg.setAttribute('transform', `scale(${scale})`);
    svg.setAttribute('transform-origin', `-${0 + scale * 100}px -${0 + scale * 100}px`);
  }
});

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', e => {
  if (e.target.value) {
    edges.forEach(edge => edge.style.opacity = '10%');
    arrows.forEach(arrow => arrow.style.opacity = '10%');
  } else {
    edges.forEach(edge => edge.style.opacity = '100%');
    arrows.forEach(arrow => arrow.style.opacity = '100%');
  }
  for (let i = 0; i < nodes.length; i++) {
    let pattern = new RegExp(e.target.value, 'i');
    if (pattern.test(nodes[i].classList.value)) {
      nodes[i].style.opacity = '100%';
    } else nodes[i].style.opacity = '10%';
  }
  for (let i = 0; i < labels.length; i++) {
    let pattern = new RegExp(e.target.value, 'i');
    if (pattern.test(labels[i].classList.value)) {
      labels[i].style.opacity = '100%';
    } else labels[i].style.opacity = '10%';
  }
});