import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
// import { transactions } from "../transactionsData";

class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      searchInput: ""
    };
  }
  componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions = () => {
    fetch(`https://boiling-brook-94902.herokuapp.com/transactions`)
      .then(resp => resp.json())
      .then(allTransactions => {
        // console.log(allTransactions);
        const lowerCaseTransactions = this.state.searchInput.toLowerCase();
        const filteredTransactions = allTransactions.filter(transaction => {
          let transactionsCategory = transaction.category.toLowerCase();
          let transactionsDescription = transaction.description.toLowerCase();
          return (transactionsCategory, transactionsDescription).includes(
            lowerCaseTransactions
          );
        });
        this.setState({
          transactions: filteredTransactions
        });
      });
  };
  handleChange = input => {
    // console.log("search type", input);
    this.setState({
      searchInput: input
    });
    this.fetchTransactions();
  };

  render() {
    return (
      <div>
        <Search handleChange={this.handleChange} />
        <TransactionsList allTransactions={this.state.transactions} />
      </div>
    );
  }
}

export default AccountContainer;
