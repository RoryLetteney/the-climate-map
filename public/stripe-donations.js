let toggleActiveSet = false;

function handleStripeDonation() {
  const cardholderForm = document.getElementById('cardholder-information');
  const toggleActive = () => cardholderForm.classList.toggle('active');
  toggleActive();
  if (!toggleActiveSet) {
    cardholderForm.addEventListener('submit', toggleActive);
    toggleActiveSet = true;
  }
}

function mountCardElement() {
  const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
  const elements = stripe.elements();
  const card = elements.create('card');
  card.mount('#card-element');
  
  card.on('change', function(event) {
    const displayError = document.getElementById('card-errors');
    const cardButton = document.getElementById('card-button');
    if (event.error) {
      displayError.textContent = event.error.message;
      cardButton.disabled = true;
    } else {
      displayError.textContent = '';
      cardButton.disabled = false;
    }
  });

  const cardholderName = document.getElementById('cardholder-name');
  const cardButton = document.getElementById('card-button');
  const clientSecret = cardButton.dataset.secret;

  // Upon button clicking, complete the payment:
  cardButton.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {name: cardholderName.value},
        }
      });
      if (result.error) {
        document.getElementById('card-errors').textContent = result.error.message;
        return false;
      } else {
        document.getElementById('card').submit();
      }
    } catch(err) {
      document.getElementById('card-errors').textContent = err.message;
      return false;
    }
  });
}