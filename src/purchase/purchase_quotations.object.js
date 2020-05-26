Creator.Objects.purchase_quotations.actions = {
  openQuotation: {
      label: "通知供应商",
      visible: true,
      on: "record",
      todo: function (object_name, record_id, fields) {
        toastr.success("开放报价、并通知供应商，待开发");
      },
  },
  confirmQuotation: {
      label: "报价完成",
      visible: true,
      on: "record",
      todo: function (object_name, record_id, fields) {
        toastr.success("供应商提交、并锁定报价，待开发");
      },
  },
  exportPR: {
      label: "生成采购申请单",
      visible: true,
      on: "record",
      todo: function (object_name, record_id, fields) {
        toastr.success("生成采购申请单，待开发");
      },
  }
}