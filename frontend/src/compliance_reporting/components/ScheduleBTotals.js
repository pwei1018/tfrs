import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';

import { formatNumeric, getQuantity } from '../../utils/functions';

const ScheduleBTotals = (props) => {
  const formatNumber = (value) => {
    if (value === 0) {
      return '-';
    }

    return formatNumeric(getQuantity(value), 2);
  };

  const getNetTotal = () => {
    const { credit, debit } = props.totals;
    const value = credit - debit;

    if (value === 0) {
      return '-';
    }

    if (value < 0) {
      return `(${formatNumeric(getQuantity(value, 2))})`;
    }

    return formatNumeric(getQuantity(value, 2));
  };

  return (
    <Draggable>
      <div
        className="schedule-totals schedule-b"
        key="totals"
      >
        <div className="row">
          <div className="col-md-12">
            <h2>Totals</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="total-credit">Total Credit</label>
          </div>
          <div className="col-md-6 value">{formatNumber(props.totals.credit)}</div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="total-debit">Total Debit</label>
          </div>
          <div className="col-md-6 value">{props.totals.debit > 0 ? `(${formatNumber(props.totals.debit)})` : '-'}</div>
        </div>

        <div className="row net-total">
          <div className="col-md-6">
            <label htmlFor="net-total">Net Credit or (Debit)</label>
          </div>
          <div className="col-md-6 value">{getNetTotal()}</div>
        </div>
      </div>
    </Draggable>
  );
};

ScheduleBTotals.propTypes = {
  totals: PropTypes.shape({
    credit: PropTypes.number,
    debit: PropTypes.number
  }).isRequired
};

export default ScheduleBTotals;
