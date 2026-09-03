import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../app/slices/transactionSlice';

function Transaction({ transaction }) {
    const dispatch = useDispatch();

    const sign = transaction.amount < 0 ? '-' : '+';
    const amountClass = transaction.amount < 0 ? 'minus' : 'plus';

    return (
        <li className={`transaction-item ${amountClass}`}>
            <span>{transaction.text}</span>
            <span>{sign}${Math.abs(transaction.amount).toFixed(2)}</span>
            <button 
                onClick={() => dispatch(deleteTransaction(transaction._id))} 
                className="delete-btn"
            >
                x
            </button>
        </li>
    );
}

export default Transaction;