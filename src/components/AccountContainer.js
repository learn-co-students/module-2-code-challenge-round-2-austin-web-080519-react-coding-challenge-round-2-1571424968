import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import { transactions } from "../transactionsData";

class AccountContainer extends Component {
  constructor() {
    super();
    this.state = {
      transactionsData: transactions,
      searchInput: ""
    };
    // get a default state working with the data imported from TransactionsData
    // use this to get the functionality working
    // then replace the default transactions with a call to the API
  }

  componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions = () => {
    fetch("https://boiling-brook-94902.herokuapp.com/transactions")
      .then(response => response.json())
      .then(transData => {
        //console.log("Fetch data: ", transData);

        //make search input to lowercase
        const lowercasedSearchInput = this.state.searchInput.toLowerCase();
        //console.log("lowercasedSearchInput = ", lowercasedSearchInput);

        //search Descriptions
        const filteredDescription = transData.filter(trans => {
          let lowercasedDescription = trans.description.toLowerCase();
          lowercasedDescription.includes(this.state.searchInput);
        });

        //search Category
        const filteredCategory = transData.filter(trans => {
          let lowercasedCategory = trans.category.toLowerCase();
          lowercasedCategory.includes(this.state.searchInput);
        });

        //search Descriptions and Category
        const filteredDandC = transData.filter(trans => {
          let lowercasedDescription = trans.description.toLowerCase();
          let lowercasedCategory = trans.category.toLowerCase();
          return (
            lowercasedDescription.includes(this.state.searchInput) ||
            lowercasedCategory.includes(this.state.searchInput)
          );
        });

        this.setState({
          transactionsData: filteredDandC
        });
      });
  };

  handleChange = input => {
    //console.log("handleChange = ", input);
    this.setState({
      searchInput: input
    });
    //refetch
    this.fetchTransactions();
  };

  render() {
    console.log("Current State = ", this.state.transactionsData);
    return (
      <div>
        <Search handleChange={this.handleChange} />
        <TransactionsList transactionsData={this.state.transactionsData} />
      </div>
    );
  }
}

export default AccountContainer;
