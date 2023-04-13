import React, { useState, useEffect } from "react";

export default function StartEthereumTransactonIndexer() {
  const [transactionIndexer, setTransactionIndexer] = useState([]);
  useEffect(() => {
    fetch(`https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${'0xed73c531B28491bFF7fc743554c25B74908D89a9'}&startblock=${8366701}&endblock=${99999999}&sort=asc&apikey=${'JB7KZVSGD7Z4AGJGEYITX4WY1W5V4I5D1K'}`)
      .then((response) => response.json())
      .then((transactionIndexer) => {
        setTransactionIndexer(transactionIndexer.result);
        console.log(transactionIndexer.result);
      });
  }, []);

  return (
    <div>
      {transactionIndexer.map((transactionIndexer, index) => {
        return (
          <div key={index}>
            {"TransactionHash: " + transactionIndexer.blockHash + " , BlockNumber: " + transactionIndexer.blockNumber}
          </div>
        );
      })}
    </div>
  );
}