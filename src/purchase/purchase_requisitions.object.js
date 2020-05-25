Creator.Objects.purchase_requisitions.actions = {
  printPR: {
      label: "打印需求单",
      visible: true,
      on: "record",
      todo: function (object_name, record_id, fields) {
        toastr.success("打印采购需求单，待开发");
      },
  }
}