// ==============================
// Concepts your teacher wants:
// - Arrow functions
// - Template literals
// - Array/Object destructuring
// - Spread operator (immutability pattern)
// - Function hoisting
// ==============================

// DOM helpers (arrow functions)
const $  = sel => document.querySelector(sel);
const fmt = num => `$ ${Number(num).toFixed(2)}`; // template literal

// -------- App state (plain object)
let state = {
  // FIX: createdAt (typo). Not used yet, but good to keep accurate.
  meta: { createdAt: new Date().toISOString().slice(0, 10), currency: 'AUD' },
  expenses: [] // each: { id, title, category, amount, date }
};

// SUM with rest parameters + reduce (arrow, spread concepts)
const sum = (...nums) => nums.reduce((acc, n) => acc + Number(n || 0), 0);

// -------- Render UI
// Default parameter + destructuring inside .map()
function render(list = state.expenses) {
  const ul = $('#items');

  ul.innerHTML = list.map(({ id, title, category, amount, date }) => `
    <li>
      <div>
        <div>
          <strong>${title}</strong>
          <span class="pill">${category}</span>
        </div>
        <div class="meta">${date || '-'}</div>
      </div>
      <div>
        <span class="amount">${fmt(amount)}</span>
        <button class="remove" data-id="${id}">Remove</button>
      </div>
    </li>
  `).join(''); // template literals + join to avoid commas

  const total = sum(...state.expenses.map(item => item.amount));
  $('#total').textContent = `Total: ${fmt(total)}`;
  // 💡 Suggestion: on large lists consider DOM diffing or DocumentFragment
}

// -------- Add new expense
// Function hoisting allows render() above to be used before here.
$('#add-form').addEventListener('submit', e => {
  e.preventDefault();
  const el = e.currentTarget.elements; // relies on input 'name' attributes

  // Object destructuring to pull values
  const { value: title }     = el.itemTitle;
  const { value: category }  = el.category;
  const { value: amountStr } = el.amount;
  const { value: date }      = el.date;     // works after we added name="date"

  if (!title.trim()) return;

  const amount = Number(amountStr || 0);
  // UUID with a fallback (nullish coalescing + optional chaining)
  const id = crypto.randomUUID?.() ?? (Date.now() + Math.random().toString(16).slice(2));

  // Short object literal syntax
  const item = { id, title, category, amount, date };

  // Spread operator: immutable-style update (new state object & array copy)
  state = { ...state, expenses: [...state.expenses, item] };

  e.currentTarget.reset();
  render();
});

// -------- Filters
$('#clear').addEventListener('click', () => {
  $('#search').value = '';
  $('#cat').value = 'All';
  render(); // reset view
});

const applyFilters = () => {
  const search = $('#search').value.trim().toLowerCase();
  const cat = $('#cat').value;

  // Destructuring parameters inside filter callback
  const list = state.expenses.filter(({ title, category }) =>
    (cat === 'All' || category === cat) &&
    (search === '' || title.toLowerCase().includes(search))
  );

  render(list);
};

$('#search').addEventListener('input', applyFilters);
$('#cat').addEventListener('change', applyFilters);

// -------- Sort
// FIX: 'epenses' → 'expenses'. Use immutable pattern + then re-render.
// 💡 Suggestion: after sorting, call applyFilters() (it will re-render) instead of render twice.
$('#sort-amount').addEventListener('click', () => {
  state = {
    ...state,
    expenses: [...state.expenses].sort((a, b) => b.amount - a.amount)
  };
  applyFilters(); // was: render(); applyFilters()
});

// FIX: use the correct button id '#sort-date' (HTML fix added)
// Sort by date string (yyyy-mm-dd). Empty dates sort last.
$('#sort-date').addEventListener('click', () => {
  state = {
    ...state,
    expenses: [...state.expenses].sort(
      (a, b) => (b.date || '').localeCompare(a.date || '')
    )
  };
  applyFilters(); // was: render(); applyFilters()
});

// -------- Remove (event delegation)
// FIX: closest, dataset usage, and reading the id from the button clicked.
$('#items').addEventListener('click', e => {
  const btn = e.target.closest('button.remove'); // FIX: closest (not 'closet')
  if (!btn) return;

  const { id } = btn.dataset; // reads data-id
  state = {
    ...state,
    expenses: state.expenses.filter(item => item.id !== id)
  };

  applyFilters();
});

// -------- Load initial Data (optional)
// $('#seed').addEventListener('click', () => {
//   const demo = [
//     { id: '1', title: 'Taxi', category: 'Transport', amount: 45.5, date: '2025-09-10' },
//     { id: '2', title: 'Noodles', category: 'Food', amount: 12, date: '2025-09-11' },
//   ];
//   state = { ...state, expenses: demo };
//   render();
// });

// -------- Initial render
render();
