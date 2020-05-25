Creator.Objects.purchase_orders.actions = {
  initiateAcceptance: {
      label: "发起验收",
      visible: true,
      on: "record",
      todo: function (object_name, record_id, fields) {
        toastr.success("发起验收，待开发");
      },
  }
}