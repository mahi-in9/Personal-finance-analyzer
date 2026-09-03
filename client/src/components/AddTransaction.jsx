
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../app/slices/transactionSlice';

function AddTransaction() {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text || !amount) {
            alert('Please enter a description and amount');
            return;
        }

        const newTransaction = {
            text,
            amount: +amount
        };

        dispatch(addTransaction(newTransaction));
        setText('');
        setAmount('');
    };

    return (
        <div className="add-transaction">
            <h1 className="add-transaction-title">Add Transaction</h1>

            <form className="add-transaction-form" onSubmit={onSubmit}>
                <textarea 
                    placeholder="Description" 
                    rows={5} 
                    cols={10} 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="Amount" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
}

export default AddTransaction;