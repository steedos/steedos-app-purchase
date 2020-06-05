module.exports = {
  openQuotation: function(){
    toastr.success("开放报价、并通知供应商，待开发");
  },

  confirmQuotation: function(){
    toastr.success("供应商提交、并锁定报价，待开发");
  },

  exportPR: function(){
    toastr.success("生成采购申请单，待开发");
  },

  openQuotationVisible: function(){
    return true
  },

  confirmQuotationVisible: function(){
    return true
  },

  exportPRVisible: function(){
    return true
  }
}