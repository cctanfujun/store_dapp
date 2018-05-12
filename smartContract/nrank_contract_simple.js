"use strict";

var NStore = function() {
  LocalContractStorage.defineMapProperty(this, "votes");
};

NStore.prototype = {
  init: function() {
    LocalContractStorage.put("items", []);
  },

  save: function(value) {
    value = value.trim();
    if (value === "") {
      throw new Error("empty key / value");
    }
    var items = LocalContractStorage.get("items");
    LocalContractStorage.put("items", items.concat([value]));
  },

  getAll: function() {
    var items = LocalContractStorage.get("items");
    return items;
  },

  vote: function(dapp_url) {
    var from = Blockchain.transaction.from;
    var key = dapp_url + from;
    var value = this.votes.get(key);
    if (value) {
      throw new Error("has vote");
    } else {
      this.votes.put(key, key);
      var items = LocalContractStorage.get("items");
      var newItems = [];
      for (var i = 0; i < items.length; i++) {
        var store_item = new StoreItem(items[i]);
        if (store_item.dapp_url == dapp_url) {
          if (store_item.rank == undefined) {
            store_item.rank = 0;
          }
          store_item.rank++;
        }
        newItems.push(JSON.stringify(store_item));
        LocalContractStorage.put("items", newItems);
      }
      return JSON.stringify(newItems);
    }
  }
};

var StoreItem = function(text) {
  if (text) {
    var obj = JSON.parse(text);
    this.fullName = obj.fullName;
    this.discover = obj.discover;
    this.dapp_url = obj.dapp_url;
    this.img_url = obj.img_url;
    this.dapp_desc = obj.dapp_desc;
    this.rank = obj.rank;
  } else {
    this.fullName = "";
    this.discover = "";
    this.dapp_url = "";
    this.img_url = "";
    this.dapp_desc = "";
    this.rank = 0;
  }
};
module.exports = NStore;
