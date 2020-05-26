module.exports = {
  listenTo: 'purchase_quotations',
  /*
    afterInsert中this结构如下: 
    userId: 当前用户唯一标识[string],
    doc: 需要新增/修改的记录内容[json],
    object_name: 当前对象名称[string],
    datasource_name: 数据源名称[string],
    getObject: function(object_name: string)
  */
  afterInsert: async function () {
    let doc = this.doc;
    let id = doc._id;
    let spaceId = doc.space;
    let owner = doc.owner;
    if (doc.requisition_id) {
      let purchase_requisitions_lines = await this.getObject('purchase_requisitions_lines').find({ filters: [['parent_id', '=', doc.requisition_id]] });
      for (let prl of purchase_requisitions_lines) {
        let purchase_quotations_lines_obj = {
          product_id: prl.product_id,
          product_code: prl.product_code,
          product_description: prl.product_description,
          unit: prl.unit,
          product_qty: prl.product_qty,
          purchaser_note: prl.purchaser_note,
          parent_id: id,
          space: spaceId,
          owner: owner
        };
        await this.getObject('purchase_quotations_lines').insert(purchase_quotations_lines_obj);
      }
    }
  },
}