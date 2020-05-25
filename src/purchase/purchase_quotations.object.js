Creator.Objects.purchase_quotations.actions = {
  openQuotation: {
      label: "开启自助报价",
      visible: true,
      on: "record",
      todo: function (object_name, record_id, fields) {
        toastr.success("开启供应商自助报价开关：修改状态，待开发");
      },
  },
  confirmQuotation: {
      label: "完成自助报价",
      visible: true,
      on: "record",
      todo: function (object_name, record_id, fields) {
        toastr.success("供应商确认已报价：修改状态，待开发");
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