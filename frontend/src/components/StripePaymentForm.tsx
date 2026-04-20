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
          <div className="mt-6 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-4">
              <CardElement options={{ hidePostalCode: true }} />
          </div>
          <button 
              disabled={isProcessing || !stripe || !elements} 
              aria-label={isProcessing ? t('stripePaymentForm.processing') : t('stripePaymentForm.payPlaceOrder')}
              className="w-full py-3 px-4 text-sm font-semibold rounded-lg text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200 shadow-sm mt-6 mb-4 disabled:opacity-50 disabled:cursor-not-allowed">
              {isProcessing ? t('stripePaymentForm.processing') : t('stripePaymentForm.payPlaceOrder')}
          </button>
        {errorMessage && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-2">
            {errorMessage}
          </p>
        )}
      </form>
  );
};

export default StripePaymentForm;
