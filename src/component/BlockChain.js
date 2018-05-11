import nebulas from "nebulas";

var dappAddress = "n1y1BHDeHwmzrmcS4Zo4ETPgLXtkmYZK9Mz";
var Account = nebulas.Account;
var neb = new nebulas.Neb();
var NebPay = require("nebpay");
var nebPay = new NebPay();
var serialNumber;
var intervalQuery;

export function sendToBlockChain(msg,callback) {
  var to = dappAddress;
  var value = "0";
  var callFunction = "save";
  var callArgs = msg
  console.log(callArgs)

  //使用nebpay的call接口去调用合约
  serialNumber = nebPay.call(to, value, callFunction, callArgs, {
    listener: callback //设置listener, 处理交易返回信息
  });

  intervalQuery = setInterval(function() {
    funcIntervalQuery();
  }, 5000);
}

export function getStoreItems() {
  var to = dappAddress;
  var value = "0";
  var callFunction = "getall";
  var callArgs = '[]';

  //使用nebpay的call接口去调用合约
  serialNumber = nebPay.call(to, value, callFunction, callArgs, {
    listener: items //设置listener, 处理交易返回信息
  });

  intervalQuery = setInterval(function() {
    funcIntervalQuery();
  }, 5000);
}

export function getfreeNrank() {
    var to = dappAddress;
    var value = "0";
    var callFunction = "save";
    var callArgs = ""
    // console.log(callArgs)
  
    //使用nebpay的call接口去调用合约
    serialNumber = nebPay.call(to, value, callFunction, callArgs, {
      listener: "" //设置listener, 处理交易返回信息
    });
  
    intervalQuery = setInterval(function() {
      funcIntervalQuery();
    }, 5000);
  }

function funcIntervalQuery() {
  nebPay
    .queryPayInfo(serialNumber) //search transaction result from server (result upload to server by app)
    .then(function(resp) {
      console.log("tx result: " + resp); //resp is a JSON string
      var respObject = JSON.parse(resp);
      if (respObject.code === 0) {
        clearInterval(intervalQuery);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}


function cbPush(resp) {
  console.log("response of push: " + JSON.stringify(resp));
}

function items(resp) {
    console.log("response of push: " + JSON.stringify(resp));
  }
