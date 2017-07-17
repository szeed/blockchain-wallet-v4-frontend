import { convertToCurrency } from './index.js'
import Maybe from 'data.maybe'

const testCases = [
  {
    network: 'bitcoin',
    amount: 100000000,
    currency: 'EUR',
    rates: { 'GBP': {'last': 2158.18} },
    value: Maybe.Nothing()
  },
  {
    network: 'bitcoin',
    amount: 100000000,
    currency: 'GBP',
    rates: { 'GBP': {'last': 2158.18} },
    value: Maybe.Just(2158.18)
  }
]

testCases.forEach(function (testCase) {
  test('Converts correct currency amount', function () {
    expect(convertToCurrency(testCase.network, testCase.amount, testCase.currency, testCase.rates)).toEqual(testCase.value)
  })
})
