import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
// import { transactions } from "../transactionsData";

class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTransData: [],
      inputValue: ""
    };
    // get a default state working with the data imported from TransactionsData
    // use this to get the functionality working
    // then replace the default transactions with a call to the API
  }

  fetchingData = () => {
    fetch("https://boiling-brook-94902.herokuapp.com/transactions")
      .then(resp => resp.json())
      .then(myTransData => {
        const inputLowerCase = this.state.inputValue.toLowerCase();

        // console.log("fetchingData", resp);
        const filteredData = myTransData.filter(data => {
          let myData =
            data.description.toLowerCase() + data.category.toLowerCase();
          return myData.includes(inputLowerCase);
        });
        this.setState({
          myTransData: filteredData
        });
      });
  };

  componentDidMount() {
    this.fetchingData();
  }

  handleChange = input => {
    // console.log(input);
    this.setState({
      inputValue: input
    });
    this.fetchingData();
  };

  render() {
    // console.log("this.state", this.props);
    console.log();
    return (
      <div>
        <Search handleChange={this.handleChange} />
        <TransactionsList myTransData={this.state.myTransData} />
      </div>
    );
  }
}

export default AccountContainer;
