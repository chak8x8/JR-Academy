// ==========================================
// APP - UI Interactions
// ==========================================
import TaxCalculator from './TaxCalculator.js';
import { TAX_TABLE_2025 } from './taxData.js';

const calculator = new TaxCalculator(TAX_TABLE_2025);

const incomeInput = document.getElementById('income');
const form = document.querySelector('form');
const resultsSection = document.getElementById('results');

/**
 * Format number as Australian currency
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Update the UI with calculation results
 * @param {object} results - The calculation results from calculator
 */
function displayResults(results) {
    if (results.error) {
        alert(results.error);
        return;
    }
    
    document.getElementById('display-income').textContent = formatCurrency(results.income);
    document.getElementById('display-tax-rate').textContent = `${results.taxRate.toFixed(1)}%`;
    document.getElementById('display-income-after-tax').textContent = formatCurrency(results.incomeAfterTax);
    document.getElementById('display-total-tax').textContent = formatCurrency(results.tax);
    
    resultsSection.classList.add('show');
}

/**
 * Handle form submission (when user clicks Calculate)
 * @param {Event} event - The form submit event
 */
function handleCalculate(event) {
    event.preventDefault();
    
    const income = parseFloat(incomeInput.value);
    
    if (!income || income <= 0) {
        alert('Please enter a valid income');
        return;
    }
    
    const results = calculator.calculate(income);
    
    displayResults(results);
}

form.addEventListener('submit', handleCalculate);