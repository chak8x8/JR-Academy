// ==========================================
// TAX DATA - Australian Income Tax Tables
// ==========================================
// Each bracket is an object with:
// - min: minimum income for this bracket
// - max: maximum income (use Infinity for top bracket)
// - baseTax: fixed tax amount before calculating extra
// - rate: tax rate as decimal (e.g., 0.19 = 19%)
const TAX_TABLE_2025 = [
    { min: 0,      max: 18200,   baseTax: 0,     rate: 0    },
    { min: 18201,  max: 45000,   baseTax: 4288,  rate: 0.16 },
    { min: 45001,  max: 135000,  baseTax: 4288, rate: 0.30 },
    { min: 135001, max: 190000,  baseTax: 31288, rate: 0.37 },
    { min: 190001, max: Infinity, baseTax: 51667, rate: 0.45 }
]

export { TAX_TABLE_2025 };