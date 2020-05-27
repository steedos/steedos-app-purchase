module.exports = {
  listenTo: 'purchase_orders',
  beforeInsert: async function () {
    let doc = this.doc;
    if (doc.quotation_id) {
      let purchaseQuotation = await this.getObject('purchase_quotations').findOne(doc.quotation_id);
      doc.amount_untaxed = purchaseQuotation.amount_untaxed; // 未税金额
      doc.amount_tax = purchaseQuotation.amount_tax; // 税金
      doc.amount_total = purchaseQuotation.amount_total; // 合计金额
      doc.amount_qty = purchaseQuotation.amount_qty; // 合计数量
    }
  },
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
    if (doc.quotation_id) {
      let purchase_quotations_lines = await this.getObject('purchase_quotations_lines').find({ filters: [['parent_id', '=', doc.quotation_id]] });
      for (let pql of purchase_quotations_lines) {
        let purchase_orders_lines_obj = {
          product_id: pql.product_id,
          product_code: pql.product_code,
          product_description: pql.product_description,
          unit: pql.unit,
          product_qty: pql.product_qty,
          price_unit: pql.price_unit,
          price_unit_excluding_tax: pql.price_unit_excluding_tax,
          tax_rate: pql.tax_rate,
          tax: pql.tax,
          price_subtotal: pql.price_subtotal,
          price_subtotal_excluding_tax: pql.price_subtotal_excluding_tax,
          parent_id: id,
          space: spaceId,
          owner: owner
        };
        await this.getObject('purchase_orders_lines').insert(purchase_orders_lines_obj);
      }
    }
  },
}