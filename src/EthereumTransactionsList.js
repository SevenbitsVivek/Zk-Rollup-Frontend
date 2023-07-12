import React, { useState, useEffect } from "react";
import ethereumAbi from './abi/UpdateTransaction.json';
import InputDataDecoder from 'ethereum-input-data-decoder';

export default function StartEthereumTransactonIndexer() {
  const [transactionIndexer, setTransactionIndexer] = useState([]);
  const [decodedValue, setDecodedValue] = useState([]);
  const [blockNumber, setBlockNumber] = useState([]);

  useEffect(() => {
    fetch(`https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${'0xCF7810FF3339aBc68401233d37baef9674bBF84D'}&startblock=${8807071 + 1}&endblock=${99999999}&sort=asc&apikey=${'JB7KZVSGD7Z4AGJGEYITX4WY1W5V4I5D1K'}`)
      .then((response) => response.json())
      .then((transactionIndexer) => {
        console.log("transactionIndexer ===>", transactionIndexer)
        const filteredTransactions = transactionIndexer.result.filter((transaction) => {
          const data = transaction.input
          const decoder = new InputDataDecoder(ethereumAbi.abi);
          const result = decoder.decodeData(data);
          return result.method === "setBase64";
        });
        setTransactionIndexer(filteredTransactions);
        let decodedBase64Array = filteredTransactions.map((transaction) => {
          const data = transaction.input
          const decoder = new InputDataDecoder(ethereumAbi.abi);
          const result = decoder.decodeData(data);
          return result.inputs[1];
        });
        let blockNumberArray = filteredTransactions.map((transaction) => {
          const data = transaction.input
          const decoder = new InputDataDecoder(ethereumAbi.abi);
          const result = decoder.decodeData(data);
          return result.inputs[0].toString();
        });
        setDecodedValue(decodedBase64Array)
        setBlockNumber(blockNumberArray)
      });
  }, []);
  
  return (
    <div>
      <div style={{ backgroundColor: 'red', display: 'flex', justifyContent: 'center', height: '13vh' }}>
        <h1>Ethereum Testnet Transaction's List</h1>
      </div>
      {transactionIndexer.map((transaction, index) => {
        return (
          <div key={index} style={{backgroundColor: 'white'}}>
            TransactionHash:<a href={"https://goerli.etherscan.io/tx/" + transaction.hash} target="_blank" rel="noreferrer">{transaction.hash}</a> <br />
            {"DecodedValue:" + decodedValue[index]} <br />
            {"BlockNumber:" + blockNumber[index]} <br /> <br />
          </div>
        );
      })}
    </div>
  );
}
