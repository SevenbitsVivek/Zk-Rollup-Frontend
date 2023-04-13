import React, { useState, useEffect } from "react";

export default function StartPolygonTransactonIndexer() {
  const [transactionIndexer, setTransactionIndexer] = useState([]);
  useEffect(() => {
    fetch(`https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${'0x87c60581A565FC1D25Ffd126FFd14965d36161a2'}&startblock=${34205248}&endblock=${99999999}&sort=asc&apikey=${'61NXGEUMZJGEXU5ZTZQN8ZGHRBC8PAVSFN'}`)
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