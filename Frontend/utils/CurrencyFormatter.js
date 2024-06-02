import React from 'react';

const CurrencyFormatter = ({ amount }) => {

  const formattedAmount = amount?.toLocaleString('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return <>{formattedAmount}</>;
};

export default CurrencyFormatter;
