// ==========================================
// TAX CALCULATOR CLASS
// ==========================================

class TaxCalculator {
    /**
     * Create a tax calculator
     * @param {Array} taxTable - Array of tax bracket objects
     */
    constructor(taxTable) {
        this.taxTable = taxTable;
    }

    /**
    * Find which tax bracket the income falls into
    * @param {number} income - The taxable income
    * @returns {object|undefined} - The matching bracket object, or undefined if not found
    */
    findBracket(income) {
        // Use Array.find() to search through the tax table
        // Return the first bracket where income is >= min AND <= max

        return this.taxTable.find(bracket => {
            return income >= bracket.min && income <= bracket.max ;
        });
    }

    /**
    * Calculate tax for the given income
    * @param {number} income - The taxable income
    * @returns {object} - Object containing all tax calculation results
    */
    calculate(income) {
        
        if (income < 0 || isNaN(income)) {
            return {
                income: 0,
                tax: 0,
                taxRate: 0,
                incomeAfterTax: 0,
                error: `Invalid income`
            };
        }

        const bracket = this.findBracket(income);

        if (!bracket) {
            return {
                income: 0,
                tax: 0,
                taxRate: 0,
                incomeAfterTax: 0,
                error: `No tax bracket found`
            };
        }

        const taxableAmount = income - bracket.min;
        const tax = bracket.baseTax + (taxableAmount * bracket.rate);
        const incomeAfterTax = income - tax;
        const marginalTaxRate = bracket.rate * 100;

        return {
            income: income,
            tax: tax,
            taxRate: marginalTaxRate,
            incomeAfterTax: incomeAfterTax,
            bracket: bracket,
            error: null
        };
    }

    /**
    * Switch to a different tax table (e.g., different year)
    * @param {Array} newTable - The new tax table to use
    */
    switchTable(newTable) {
        this.taxTable = newTable;
    }
}

export default TaxCalculator;