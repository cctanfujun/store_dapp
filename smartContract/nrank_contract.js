"use strict";

var Allowed = function(obj) {
  this.allowed = {};
  this.parse(obj);
};

Allowed.prototype = {
  toString: function() {
    return JSON.stringify(this.allowed);
  },

  parse: function(obj) {
    if (typeof obj != "undefined") {
      var data = JSON.parse(obj);
      for (var key in data) {
        this.allowed[key] = new BigNumber(data[key]);
      }
    }
  },

  get: function(key) {
    return this.allowed[key];
  },

  set: function(key, value) {
    this.allowed[key] = new BigNumber(value);
  }
};
var NStore = function() {
  LocalContractStorage.defineProperties(this, {
    name: "nrank",
    symbol: "NRANK",
    decimals: 8,
    totalSupply: {
      parse: function(value) {
        return new BigNumber(value);
      },
      stringify: function(o) {
        return o.toString(10);
      }
    }
  });

  LocalContractStorage.defineMapProperties(this, {
    balances: {
      parse: function(value) {
        return new BigNumber(value);
      },
      stringify: function(o) {
        return o.toString(10);
      }
    },
    allowed: {
      parse: function(value) {
        return new Allowed(value);
      },
      stringify: function(o) {
        return o.toString();
      }
    }
  });

  // 保存每个 Dapp 信息
  LocalContractStorage.put("items", []);
  
  // 保存每个 Dapp 当前 点赞人 和 点赞数量 
  //[{address:xxx,nrank:10}]
  LocalContractStorage.defineMapProperties(this, "ranks");

};

var StoreItem = function(text) {
	if (text) {
		var obj = JSON.StoreItem(text);
		this.fullName = obj.fullName;
		this.discover = obj.discover;
        this.img_url = obj.img_url;
        this.dapp_desc = obj.dapp_desc;
        this.total_rank = obk.total_rank;
	} else {
	    this.fullName = "";
	    this.discover = "";
        this.img_url = "";
        this.dapp_desc = "";
        this.total_rank = 0;
	}
};

NStore.prototype = {
  init: function(name, symbol, decimals, totalSupply) {
    this._name = name;
    this._symbol = symbol;
    this._decimals = decimals || 0;
    this._totalSupply = new BigNumber(totalSupply).mul(
      new BigNumber(10).pow(decimals)
    );

    var from = Blockchain.transaction.from;
    this.balances.set(from, this._totalSupply);
    this.transferEvent(true, from, from, this._totalSupply);
  },

  // Returns the name of the token
  name: function() {
    return this._name;
  },

  // Returns the symbol of the token
  symbol: function() {
    return this._symbol;
  },

  // Returns the number of decimals the token uses
  decimals: function() {
    return this._decimals;
  },

  totalSupply: function() {
    return this._totalSupply.toString(10);
  },

  balanceOf: function(owner) {
    var balance = this.balances.get(owner);

    if (balance instanceof BigNumber) {
      return balance.toString(10);
    } else {
      return "0";
    }
  },

  transfer: function(to, value) {
    value = new BigNumber(value);
    if (value.lt(0)) {
      throw new Error("invalid value.");
    }

    var from = Blockchain.transaction.from;
    var balance = this.balances.get(from) || new BigNumber(0);

    if (balance.lt(value)) {
      throw new Error("transfer failed.");
    }

    this.balances.set(from, balance.sub(value));
    var toBalance = this.balances.get(to) || new BigNumber(0);
    this.balances.set(to, toBalance.add(value));

    this.transferEvent(true, from, to, value);
  },

  transferFrom: function(from, to, value) {
    var spender = Blockchain.transaction.from;
    var balance = this.balances.get(from) || new BigNumber(0);

    var allowed = this.allowed.get(from) || new Allowed();
    var allowedValue = allowed.get(spender) || new BigNumber(0);
    value = new BigNumber(value);

    if (value.gte(0) && balance.gte(value) && allowedValue.get(value)) {
      this.balances.set(from, balance.sub(value));

      // update allowed value
      allowed.set(spender, allowedValue.sub(value));
      this.allowed.set(from, allowed);

      var toBalance = this.balances.get(to) || new BigNumber(0);
      this.balances.set(to, toBalance.add(value));

      this.transferEvent(true, from, to, value);
    } else {
      throw new Error("transfer failed.");
    }
  },

  transferEvent: function(status, from, to, value) {
    Event.Trigger(this.name(), {
      Status: status,
      Transfer: {
        from: from,
        to: to,
        value: value
      }
    });
  },

  approve: function(spender, currentValue, value) {
    var from = Blockchain.transaction.from;

    var oldValue = this.allowance(from, spender);
    if (oldValue != currentValue.toString()) {
      throw new Error("current approve value mistake.");
    }

    var balance = new BigNumber(this.balanceOf(from));
    var value = new BigNumber(value);

    if (value.lt(0) || balance.lt(value)) {
      throw new Error("invalid value.");
    }

    var owned = this.allowed.get(from) || new Allowed();
    owned.set(spender, value);

    this.allowed.set(from, owned);

    this.approveEvent(true, from, spender, value);
  },

  approveEvent: function(status, from, spender, value) {
    Event.Trigger(this.name(), {
      Status: status,
      Approve: {
        owner: from,
        spender: spender,
        value: value
      }
    });
  },

  allowance: function(owner, spender) {
    var owned = this.allowed.get(owner);

    if (owned instanceof Allowed) {
      var spender = owned.get(spender);
      if (typeof spender != "undefined") {
        return spender.toString(10);
      }
    }
    return "0";
  },

  save: function(item) {
    var item_str = item.trim();
    var s_item = new StoreItem(item)
    var dapp_url = s_item.dapp_url
    var ranks = this.ranks.get(dapp_url)
    var item_total_rank = 0
    for (i=0;i<ranks.length;i++){
        item_total_rank += ranks[i].get('nrank')
    }
    s_item.total_rank = item_total_rank
    var item_json = JSON.stringify(s_item)
    var items = LocalContractStorage.get("items");
    LocalContractStorage.put("items", items.concat([item_json]));
  },

  getall: function() {
    var items = LocalContractStorage.get("items");
    return JSON.stringify(items);
  },
  vote: function(dapp_url, nrank_value) {
    var from = Blockchain.transaction.from;
    var balance = this.balances.get(from);
  },
  getfree: function() {},
  getNasByNrank: function(nrank_value) {},
  getNrankByNas: function(nrank_value) {}
};

module.exports = NStore;
