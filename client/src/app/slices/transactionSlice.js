import api from '../../api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTransactions = createAsyncThunk(
    'transactions/getTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/transactions');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (transactionData, { rejectWithValue }) => {
        try {
            const response = await api.post('/transactions', transactionData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/transactions/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // getTransactions
            .addCase(getTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // addTransaction
            .addCase(addTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.push(action.payload);
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // deleteTransaction
            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = state.transactions.filter(
                    (transaction) => transaction._id !== action.payload
                );
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError } = transactionSlice.actions;
export default transactionSlice.reducer;
