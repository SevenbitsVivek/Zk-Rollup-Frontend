import React, { useState, useEffect } from "react";
import polygonAbi from './abi/UpdateTransaction.json';
import InputDataDecoder from 'ethereum-input-data-decoder';

export default function StartPolygonTransactonIndexer() {
  const [transactionIndexer, setTransactionIndexer] = useState([]);
  const [decodedValue, setDecodedValue] = useState([]);
  useEffect(() => {
    fetch(`https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${'0x87c60581A565FC1D25Ffd126FFd14965d36161a2'}&startblock=${34205248 + 1}&endblock=${99999999}&sort=asc&apikey=${'61NXGEUMZJGEXU5ZTZQN8ZGHRBC8PAVSFN'}`)
      .then((response) => response.json())
      .then((transactionIndexer) => {
        setTransactionIndexer(transactionIndexer.result);
        let resultArray = []
        for (var i = 0; i < transactionIndexer.result.length; i++) {
          if (transactionIndexer.result[i].txreceipt_status === "1") {
            const data = transactionIndexer.result[i].input
            const decoder = new InputDataDecoder(polygonAbi.abi);
            const result = decoder.decodeData(data);
            if (result.method === "setBase64") {
              resultArray.push(result.inputs[1])
            }
          }
        }
        setDecodedValue(resultArray)
      });
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', height: '13vh' }}>
        <h1>Polygon Testnet Transaction's List</h1>
      </div>
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