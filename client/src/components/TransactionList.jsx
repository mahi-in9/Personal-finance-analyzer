import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../app/slices/transactionSlice';
import Transaction from './Transaction';

function TransactionList() {
    const dispatch = useDispatch();
    const { transactions, loading, error } = useSelector((state) => state.transactions);

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);

    if (loading) {
        return <p>Loading transactions...</p>;
    }

    if (error) {
        return <p className="error">Error loading transactions.</p>;
    }

    return (
        <div className="transaction-list-container">
            <h3 className="transaction-list-title">History</h3>
            <ul className="transaction-list">
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <Transaction key={transaction._id} transaction={transaction} />
                    ))
                ) : (
                    <p>No transactions yet.</p>
                )}
            </ul>
        </div>
    );
}

export default TransactionList;