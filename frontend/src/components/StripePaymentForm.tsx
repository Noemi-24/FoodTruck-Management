import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useTranslation } from 'react-i18next';

interface StripePaymentFormProps {
    onSuccess: () => void;
    clientSecret: string;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({onSuccess, clientSecret}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return; // Stripe has not loaded yet

    setIsProcessing(true);

    console.log('card element:', elements.getElement(CardElement));

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
    }
    });

    if (error) {
      setErrorMessage(error.message ?? 'An unexpected error occurred.');
    }else if (paymentIntent?.status === 'succeeded') {
        onSuccess();
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} className='mt-8'/>
        <button 
          disabled={isProcessing || !stripe || !elements} 
          aria-label={isProcessing ? t('stripePaymentForm.processing') : t('stripePaymentForm.payPlaceOrder')}
          className="w-full shadow-xl py-2 px-4 text-[15px] font-medium tracking-wide rounded-md cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 mt-8 mb-4">
          {isProcessing ? t('stripePaymentForm.processing') : t('stripePaymentForm.payPlaceOrder')}
        </button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </form>
  );
};

export default StripePaymentForm;
