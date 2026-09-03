import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import transactionReducer from './slices/transactionSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        transactions: transactionReducer,
    },
});

export default store;