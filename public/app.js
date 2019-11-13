const toCurrency = price => {
  return new Intl.NumberFormat('ru-Ru', {
    currency: 'usd',
    style: 'currency'
  }).format(price);
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent);
})

const $card = document.querySelector('#card');
if($card) {
  $card.addEventListener('click', event => {
    if(event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id;

      fetch('/card/remove/' + id, {
        method: 'delete'
      }).then(res => res.json())
        .then(card => {
            if(card.sorts.length) {
              const html = card.sorts.map(s => {
                return `
                <tr>
                  <td>${s.title}</td>
                  <td>${s.count}</td>
                  <td>
                    <button class="btn btm-small js-remove" data-id="${s.id}">Delete</button>
                  </td>
                </tr>
                `
              }).join('');
              $card.querySelector('tbody').innerHTML = html;
              $card.querySelector('.price').textContent = toCurrency(card.price);
            } else {
              $card.innerHTML = '<p>The basket is empty</p>'
            }
        })
    }
  })
}