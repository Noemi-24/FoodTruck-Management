import {useState, useReducer, useEffect, useMemo, useCallback} from 'react';
import { type ProductResponse } from '../types/product.types';
import type { PaymentMethod, CreateOrderRequest} from '../types/order.types';
import { getAllProducts } from '../services/productService';
import { cartReducer } from '../reducers/cartReducer';
import { createOrder } from '../services/orderService';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ProductoCard from '../components/ProductCard';
import { type CartItem } from '../types/cart.types';
import SearchBar from '../components/SearchBar';
import { createPaymentIntent } from '../services/paymentService';
import StripePaymentForm from '../components/StripePaymentForm';
import { stripePromise } from '../lib/stripe';
import { Elements } from '@stripe/react-stripe-js';
import SkeletonCard from '../components/SkeletonCard';

function NewOrder(){
    const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const [success, setSuccess] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");    
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [activeNotes, setActiveNotes] = useState<number | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [customerForm, setCustomerForm] = useState({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        paymentMethod: "CASH" as PaymentMethod,
        note: ""
    });

     const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            //uncomment to see skeleton
            //await new Promise(resolve => setTimeout(resolve, 3000));
            const result = await getAllProducts();
            setProducts(result);
        } catch (error) {
            setError(error instanceof Error ? error.message: "An unknown error occurred");
            
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const availableProducts = useMemo( () => {
        return products
        .filter(p => p.available)
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm]);

    const handleAddToCart = useCallback ((product: ProductResponse) =>{
        dispatch({
        type: "ADD_ITEM",
        payload: {
            productId: product.productId,
            productName: product.name,
            imageUrl:product.imageUrl,
            quantity: 1,
            priceAtOrder: product.price,
            subtotal: product.price,
            notes: ""
        }
        });
    }, [dispatch]);

    const handleRemoveFromCart = useCallback((productId: number) => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload:productId
        });
    }, [dispatch]);

    const handleCreateOrder = async () => {
        const orderRequest: CreateOrderRequest = {
            customerName: customerForm.customerName,
            customerPhone: customerForm.customerPhone,
            customerEmail: customerForm.customerEmail,
            paymentMethod: customerForm.paymentMethod,            
            status: 'PENDING',
            note: customerForm.note,
            items: state.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                notes:item.notes
            })),
        };

        await createOrder(orderRequest);

        dispatch({ type: "CLEAR_CART" });
        setSuccess(t('orders.successMessage'));
        setTimeout(() => {
            navigate('/orders');
        }, 2000);

        setClientSecret(null);

        setCustomerForm({
            customerName: "",
            customerPhone: "",
            customerEmail: "",
            paymentMethod: "CASH",
            note: ""
            });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!customerForm.customerName || !customerForm.customerPhone) {
            setError("Please fill in all required fields");
            return;
        }

        if (state.items.length === 0) {
            setError("Please add items to the cart");
            return;
        }

        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(customerForm.customerPhone)) {
            setError("Phone format must be 000-000-0000");
            return;
        }

        try {
            await handleCreateOrder();

        } catch (error) {
            setError(error instanceof Error ? error.message: t('orders.errorCreate')); 
        }
    };

    const formatPhone = (value: string) => {
        // 1. Remove all non-digit characters
        const cleaned = value.replaceAll(/\D/g, '');

        // 2. Limit to 10 digits
        const limited = cleaned.slice(0, 10);

        // 3. Insert dashes based on length
        if (limited.length <= 3) return limited;
        if (limited.length <= 6) return `${limited.slice(0, 3)}-${limited.slice(3)}`;
        return `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6, 10)}`;
    };

    const handleDecrease = (item: CartItem) => {
        if (item.quantity > 1) {
            dispatch({
            type: "UPDATE_QUANTITY",
            payload: {
                productId: item.productId,
                quantity: item.quantity - 1
            }
            });
        } else {
            dispatch({
            type: "REMOVE_ITEM",
            payload: item.productId
            });
        }
    };

    const handlePaymentMethodChange = async (method: PaymentMethod) => {
        setCustomerForm(prev => ({...prev, paymentMethod: method}));
        
        if (method === 'STRIPE' && state.total > 0) {
            const response = await createPaymentIntent(Math.round(state.total * 100));
            setClientSecret(response.clientSecret);
        } else {
            setClientSecret(null);
        }
    };

    if (loading) return (
        <div className='flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-8 items-start'>
            <div className='flex-1'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        </div>
    );
    return(
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 items-start">
            {/* Search + Menu */}
            <div className='flex-1'>
                <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">
                        {t('newOrder.heading')}
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {t('newOrder.title')}
                    </h1>
                </div>
                <SearchBar value={searchTerm} onChange={setSearchTerm}/>

                {/* Grid products */}
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>                    
                    {availableProducts.map((product) => (
                        <ProductoCard key={product.productId} product={product} onAddToCart={handleAddToCart}/>
                    ))}
                </div>
            </div>
            
             {/* Cart */}
            <div className="w-full lg:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-4 p-4 sm:p-6">
                <div className="flex flex-col gap-3 py-6 text-xs">
                    <h1  className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{t('newOrder.subtitle')}</h1>
                    <div>
                        {state.items.map((item) =>(
                            <ul className="border-b py-4 dark:text-white" key={item.productId}>
                                <div className='flex gap-3 py-3'>
                                    <img loading="lazy" className='h-16 w-16 flex-shrink-0 rounded-lg border border-gray-200 object-cover' src={item.imageUrl} onError={(e) => (e.currentTarget.src = '/tacos.jpg')} alt={item.productName} />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{item.productName}</p>
                                        {activeNotes === item.productId ? (
                                            <input
                                                type="text"
                                                placeholder={t('newOrder.placeholderItemNote')}
                                                value={item.notes}
                                                onChange={(e) => dispatch({
                                                    type: 'UPDATE_NOTES',
                                                    payload: { productId: item.productId, notes: e.target.value }
                                                })
                                                }
                                                onBlur={() => setActiveNotes(null)}
                                                autoFocus
                                                className="w-full text-xs rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-2 py-1.5 mt-2 outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            ) : (
                                            <button
                                                onClick={() => setActiveNotes(item.productId)}
                                                className="text-xs text-blue-600 dark:text-blue-400 mt-2 hover:underline"
                                            >
                                                {item.notes ? item.notes : t('newOrder.addNotesButton')}
                                            </button>
                                        )}
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white mt-2">$ {item.subtotal.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <li>
                                        <button 
                                            aria-label={t('newOrder.removeButton')}
                                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                                            onClick={() => handleRemoveFromCart(item.productId)}>
                                            {t('newOrder.removeButton')}
                                        </button>
                                    </li>
                                    <li className="border border-gray-200 dark:border-gray-600 rounded-lg py-1.5 px-3 flex items-center gap-3">
                                        <button 
                                            aria-label={t('newOrder.decreaseButton')}
                                            onClick={() => handleDecrease(item)}>
                                            -
                                        </button>
                                            <span>{item.quantity}</span>                                    
                                        <button 
                                            aria-label={t('newOrder.incrementButton')}
                                            onClick={() => 
                                            dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.productId, quantity: item.quantity + 1 }})}
                                        >+</button>
                                    </li>                                   
                                </div>                             
                                
                            </ul>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="bg-gray-50 dark:bg-gray-700/60 rounded-xl p-4 sm:p-5 mb-4 dark:text-white border border-gray-200 dark:border-gray-600">
                        <p className=" text-lg flex justify-between">
                            <span>{t('newOrder.orderTotal')}</span>
                            <span>$ {state.total.toFixed(2)}</span>
                        </p>  
                    </div>                      
                </div>
                <div className='border-b border border-dashed'></div>

                {/* Customer form */}
                <div>
                    <form onSubmit={handleSubmit}>
                        <h3 className='mb-2 mt-8 font-bold text-gray-900 dark:text-white'>{t('orders.customer')}</h3>
                        <input
                            type="text"
                            name="name"
                            aria-label={t('orders.tableHeaders.name')}
                            placeholder={t('orders.tableHeaders.name')}
                            value={customerForm.customerName}
                            onChange={(e) => setCustomerForm(prev => ({...prev, customerName: e.target.value}))}
                            className="w-full text-sm rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                        />

                        <input
                            type="text"
                            name="phone"
                            aria-label={t('orders.phone')}
                            placeholder={t('orders.phone')}
                            value={customerForm.customerPhone}
                            onChange={(e) => setCustomerForm(prev => ({...prev, customerPhone: formatPhone(e.target.value)}))}
                            className="w-full text-sm rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                        />

                        <input
                            type="email"
                            name="email"
                            aria-label={t('orders.email')}
                            placeholder={`${t('orders.email')} (${t('common.optional')})`}
                            value={customerForm.customerEmail}
                            onChange={(e) => setCustomerForm(prev => ({...prev, customerEmail: e.target.value}))}
                            className="w-full text-sm rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                        />
                        
                        <textarea 
                            className="w-full text-sm rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                            placeholder={t('newOrder.placeholderNote')}
                            aria-label={t('newOrder.placeholderNote')}
                            value={customerForm.note}
                            onChange={(e) => setCustomerForm(prev => ({...prev, note: e.target.value}))}>
                        </textarea>
                       
                        <select className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mt-8 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500"
                            value={customerForm.paymentMethod}
                            aria-label={t('newOrder.payment.choose')}
                            onChange={(e) => handlePaymentMethodChange(e.target.value as PaymentMethod)}>
                            <option defaultValue="">{t('newOrder.payment.choose')}</option>
                            <option value='CASH'>{t('newOrder.payment.cash')}</option>
                            <option value='STRIPE'>{t('newOrder.payment.stripe')}</option>
                        </select>                        

                        {customerForm.paymentMethod !== 'STRIPE' && (
                            <button 
                                aria-label={t('newOrder.placeOrderButton')}
                                type="submit"  
                                className="w-full py-3 px-4 text-sm font-semibold rounded-lg text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200 shadow-sm mt-8 mb-4">
                                {t('newOrder.placeOrderButton')}
                                </button>
                        )}

                        {success && <p className="text-green-600 dark:text-green-400 mt-4">{success}</p>}

                    </form>

                    {/* Stripe Card Payment */}
                    <div>
                        {clientSecret && customerForm.paymentMethod === 'STRIPE' && (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <StripePaymentForm 
                                    onSuccess={handleCreateOrder}
                                    clientSecret={clientSecret}
                                />
                            </Elements>
                        )}
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default NewOrder;

