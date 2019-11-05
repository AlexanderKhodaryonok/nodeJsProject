document.querySelectorAll('.price').forEach(node => {
  node.textContent = new Intl.NumberFormat('ru-Ru', {
    currency: 'usd',
    style: 'currency'
  }).format(node.textContent);
})