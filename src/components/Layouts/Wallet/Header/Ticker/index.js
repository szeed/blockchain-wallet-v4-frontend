import React from 'react'
import {connect} from 'react-redux'

import { convertToUnit, convertCoinToFiat, coinScale } from 'services/ConversionService'
import { selectors } from 'data'

import Ticker from './template.js'

class TickerContainer extends React.Component {
  render () {
    const { network, unit, currency, rates } = this.props
    const amount = coinScale(network)
    const crypto = convertToUnit(network, amount, unit).getOrElse({ amount: 'N/A', symbol: '' })
    const fiat = convertCoinToFiat(network, amount, currency, rates).getOrElse({ amount: 'N/A', symbol: '' })

    return (
      <Ticker
        bitcoinValue={`${crypto.amount} ${crypto.symbol}`}
        currencyValue={`${fiat.symbol} ${fiat.amount}`}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    network: 'bitcoin',
    unit: selectors.core.settings.getBtcCurrency(state),
    currency: selectors.core.settings.getCurrency(state),
    rates: selectors.core.rates.getRates(state)
  }
}

export default connect(mapStateToProps)(TickerContainer)
