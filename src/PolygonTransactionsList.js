import React, { useState, useEffect } from "react";
import polygonAbi from './abi/UpdateTransaction.json';
import InputDataDecoder from 'ethereum-input-data-decoder';

export default function StartPolygonTransactonIndexer() {
  const [transactionIndexer, setTransactionIndexer] = useState([]);
  const [decodedValue, setDecodedValue] = useState([]);
  useEffect(() => {
    fetch(`https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${'0x87c60581A565FC1D25Ffd126FFd14965d36161a2'}&startblock=${34205248}&endblock=${99999999}&sort=asc&apikey=${'61NXGEUMZJGEXU5ZTZQN8ZGHRBC8PAVSFN'}`)
      .then((response) => response.json())
      .then((transactionIndexer) => {
        setTransactionIndexer(transactionIndexer.result);
        let resultArray = []
        for (var i = 1; i < transactionIndexer.result.length; i++) {
          const data = transactionIndexer.result[i].input
          const decoder = new InputDataDecoder(polygonAbi.abi);
          const result = decoder.decodeData(data);
          resultArray.push(result.inputs[1])
        }
        setDecodedValue(resultArray)
      });
  }, []);

  return (
    <div>
      {transactionIndexer.map((transaction, index) => {
        return (
          <div key={index}>
            TransactionHash:<a href={"https://mumbai.polygonscan.com/tx/" + transaction.hash} target="_blank" rel="noreferrer">{transaction.hash}</a> <br />
            {"DecodedValue:" + decodedValue[index]} <br /> <br />
          </div>
        );
      })}
    </div>
  );
}
