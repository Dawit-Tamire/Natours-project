import axios from 'axios';
import { showAlert } from './alerts';
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(
  'pk_test_51Mx9ijLurg5wn2FXTzsIJsm0tXMPaBMsGKuZyGAxvrfb5CdkXIG5SWZY9iUV070tXOq8oGL7wlynCisKTdVGNFNU00jt8vUUfC'
);

export const bookTour = async (tourId) => {
  try {
    console.log('session will be received');

    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log('session received');

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    // await res.redirect(303, session.url);
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
