import { formatCurrency } from '../../scripts/utils/money.js';

console.log('test suite : formatCurrency');

let passed = 0;
let failed = 0;

function test(name, actual, expected) {
  if (actual === expected) {
    passed++;
    console.log(`passed: ${name}`);
  } else {
    failed++;
    console.log(`FAILED: ${name} (got '${actual}', expected '${expected}')`);
  }
}

// Basic conversions
test('converts 2095 cents', formatCurrency(2095), '20.95');
test('converts 1000 cents', formatCurrency(1000), '10.00');
test('converts 100 cents to 1 dollar', formatCurrency(100), '1.00');
test('converts large amount', formatCurrency(1234567), '12345.67');

// Zero and tiny values
test('works with 0', formatCurrency(0), '0.00');
test('1 cent', formatCurrency(1), '0.01');
test('5 cents keeps leading zero', formatCurrency(5), '0.05');
test('9 cents', formatCurrency(9), '0.09');
test('99 cents', formatCurrency(99), '0.99');
test('101 cents', formatCurrency(101), '1.01');

// Trailing zeros must be kept
test('keeps trailing zero', formatCurrency(1090), '10.90');
test('keeps trailing zero (10 cents)', formatCurrency(10), '0.10');

// Rounding to the nearest cent
test('rounds 2000.4 down', formatCurrency(2000.4), '20.00');
test('rounds 2000.5 up', formatCurrency(2000.5), '20.01');
test('rounds 2000.6 up', formatCurrency(2000.6), '20.01');
test('rounds 1999.5 up to next dollar', formatCurrency(1999.5), '20.00');
test('rounds 0.4 down to zero', formatCurrency(0.4), '0.00');
test('rounds 0.5 up to 1 cent', formatCurrency(0.5), '0.01');
test('rounds 0.49 down', formatCurrency(0.49), '0.00');

// Negative values (refunds, discounts)
test('negative amount', formatCurrency(-500), '-5.00');

// Numeric strings (e.g. read from an input or localStorage)
test('string input', formatCurrency('2095'), '20.95');

console.log(`\n${passed} passed, ${failed} failed`);