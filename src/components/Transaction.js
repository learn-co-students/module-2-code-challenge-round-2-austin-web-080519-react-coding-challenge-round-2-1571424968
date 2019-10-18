import React from "react";

const Transaction = props => {
  // console.log(props);
  const { posted_at, description, category, amount } = props.myTransData;
  return (
    <tr>
      <td>{posted_at}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
    </tr>
  );
};

export default Transaction;
