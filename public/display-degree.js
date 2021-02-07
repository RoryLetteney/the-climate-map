let displayDegreeAttached = false;

function toggleDisplayDegree(e) {
  if (e.checked) {
    displayDegreeAttached = true;
    nodes.forEach(n => {
      n.addEventListener('mousemove', displayDegree);
      n.addEventListener('mouseleave', displayDegree);
    });
    labels.forEach(l => {
      l.addEventListener('mousemove', displayDegree);
      l.addEventListener('mouseleave', displayDegree);
    });
  } else {
    displayDegreeAttached = false;
    nodes.forEach(n => {
      n.removeEventListener('mousemove', displayDegree);
      n.removeEventListener('mouseleave', displayDegree);
    });
    labels.forEach(l => {
      l.removeEventListener('mousemove', displayDegree);
      l.removeEventListener('mouseleave', displayDegree);
    });    
  }
}

function displayDegree(e) {
  console.log('displaying');
  const displayDegreeSpan = document.getElementById('degree-display');
  switch (e.type) {
    case 'mouseleave':
      displayDegreeSpan.classList.remove('active');
      break;
    default:
      const pattern = new RegExp(e.target.className.baseVal);
      const degree = edges.filter(e => pattern.test(e.className.baseVal)).length;
      
      displayDegreeSpan.innerText = degree;
      displayDegreeSpan.style.top = `${e.clientY - 35}px`;
      displayDegreeSpan.style.left = `${e.clientX - 15}px`;

      displayDegreeSpan.classList.add('active');
      break;
  }
}