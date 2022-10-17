import React from 'react'
import { useEffect } from 'react';

const payment = () =>{
    state = {
    cardNumber: "0000 0000 0000 0000",
    cardHolderName: "",
    cardExpirationDate: "",
    cardCVV: "",
    cardType: "💳"
  };
  flipCard = () => {
    anime({
      targets: ".credit-card-inner",
      rotateY: "180deg",
      duration: "100",
      easing: "linear"
    });
  };
  unFlipCard = () => {
    anime({
      targets: ".credit-card-inner",
      rotateY: "360deg",
      duration: "100",
      easing: "linear"
    });
  };
  setCardType = type => {
    this.setState({ cardType: type });
  };
  checkSubstring = (length, match) => {
    return this.state.cardNumber.substring(0, length) === match;
  };
  setNumber = e => {
    const cardNumber = e.target.value;
    this.setState({ cardNumber }, () => {
      const { cardNumber } = this.state;
      if (cardNumber[0] === "4") {
        this.setCardType("Visa");
      } else if (this.checkSubstring(4, "6011")) {
        this.setCardType("Discover");
      } else if (this.checkSubstring(2, "51")) {
        this.setCardType("MasterCard");
      } else if (this.checkSubstring(2, "34")) {
        this.setCardType("American Express");
      } else if (this.checkSubstring(3, "300")) {
        this.setCardType("Diners Club");
      } else if (this.checkSubstring(2, "35")) {
        this.setCardType("JCB");
      } else {
        this.setCardType("💳");
      }
    });
  };
  setName = e => {
    const cardHolderName = e.target.value.toUpperCase();
    this.setState({ cardHolderName });
  };
  setDate = e => {
    let data = (e.target.value).split("");
    console.log(data)
    let cardExpirationDate = (data.map((x) => {
      return x === "-" ? "/" : x
    })).join("");
    console.log(cardExpirationDate)
    this.setState({ cardExpirationDate });
  };
  setCVV = e => {
    const cardCVV = e.target.value;
    this.setState({ cardCVV });
  }; 
    return (
      <div className="container">
        <div className="credit-card">
          <div className="credit-card-inner">
            <div className="credit-card-front">
              
              <div id="card-type">{cardType}</div>
              <div id="card-number">{cardNumber}</div>

              <div id="card-expiration">
                {cardExpirationDate !== "" && <div id="validthru">Valid Thru</div>}
                {cardExpirationDate}
              </div>

              <div id="card-holder-name">{cardHolderName}</div>
            </div>
            <div className="credit-card-back">
              <div className="card-stripe" />
              <div className="card-sig-container">
                <div className="signature">{cardHolderName}</div>
                CVC {cardCVV}
              </div>
              <p className="credits">Built with Cleave.js, Anime.js, and React Icons.</p>
            </div>
          </div>
        </div>
        <form className="card-form">
          <label className="input-label">Credit Card Number</label>
          <input
            placeholder="Enter your credit card number"
            options={{ creditCard: true }}
            id="number-input"
            name="number-input"
            className="text-input"
            maxLength="16"
            onChange={this.setNumber}
          />
          <label className="input-label">Card Holder Name</label>
          <input
            type="text"
            placeholder="Enter card holder name"
            value={cardHolderName}
            onChange={e => this.setName(e)}
            className="text-input"
            maxLength="30"
          />
          <div className="date-and-csv" style={{ display: "flex" }}>
            <div
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <label className="input-label">
                Expiration Date
              </label>
              <input
                type="month"
                placeholder="Enter expiration date"
                className="text-input"
                onChange={e => this.setDate(e)}
                style={{ height: "23px", fontSize: "16px", fontWeight: "100" }}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <label className="input-label">CVC Security Code</label>
              <input
                options={{
                  numeral: "true"
                }}
                placeholder="Enter CVC"
                maxLength="3"
                value={cardCVV}
                className="text-input"
                onChange={e => this.setCVV(e)}
                onFocus={this.flipCard}
                onBlur={this.unFlipCard}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default payment