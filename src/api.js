import axios from 'axios';

const polygonTransactionIndexer = async () => {
    try {
        let transactionResponse = await axios({
            url: `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${'0x87c60581A565FC1D25Ffd126FFd14965d36161a2'}&startblock=${34205248}&endblock=${99999999}&sort=asc&apikey=${'61NXGEUMZJGEXU5ZTZQN8ZGHRBC8PAVSFN'}`,
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
            method: "GET",
        })
        console.log("transactionResponse ===>", transactionResponse.data.result)
    } catch (err) {
        //showToast({ message: "Invalid amount", type: "error" });
        console.log(err);
        return false;
    }
}

export default polygonTransactionIndexer;