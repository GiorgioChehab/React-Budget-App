import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, expenses, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [newCurrency, setNewCurrency] = useState(currency);

    const totalExpenses = expenses.reduce((total, item) => {
        return total + item.cost;
    }, 0);

    const handleBudgetChange = (event) => {

        const updatedBudget = parseInt(event.target.value, 10);
        if(updatedBudget > 20000)
        {
            alert("Budget cannot exceed 20,000");
            return;

        }

        if (updatedBudget < totalExpenses) {
            alert("You cannot reduce the budget value lower than the spending");
            return;
        }

        setNewBudget(event.target.value);

        dispatch({
            type: 'SET_BUDGET',
            payload: event.target.value
        });
    }

    const handleCurrencyChange = (event) => {
        const selectedCurrency = event.target.value;
        setNewCurrency(selectedCurrency);

        dispatch({
            type: 'CHG_CURRENCY',
            payload: selectedCurrency
        });
    };

    return (
<div className='alert alert-secondary'>
<span>Budget: {currency}{budget}</span>
<input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>

<div>
                <label htmlFor="currency">Currency: </label>
                <select 
                    id="currency" 
                    value={newCurrency} 
                    onChange={handleCurrencyChange}
                >
                    <option value="$">Dollar ($)</option>
                    <option value="£">Pound (£)</option>
                    <option value="€">Euro (€)</option>
                    <option value="₹">Rupee (₹)</option>
                </select>
            </div>
</div>


    );
};
export default Budget;