"use strict";


var NStore = function() {
  
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
  init: function() {
    
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
