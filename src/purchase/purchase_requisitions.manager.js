const objectql = require('@steedos/objectql');
/**
 * 
 * @param {string} requisitionId 
 */

async function caculateAmount(requisitionId) {
  if (!requisitionId) {
    return;
  }
  const steedosSchema = objectql.getSteedosSchema();
  let requisitionObj = steedosSchema.getObject('purchase_requisitions');

  let requisition = await requisitionObj.findOne(requisitionId);
  if (!requisition) {
    console.error(`未找到采购需求：${requisitionId}`);
    return;
  }

  let product_qty = 0;
  (await steedosSchema.getObject('purchase_requisitions_lines').find({ filters: [['parent_id', '=', requisitionId]] })).forEach(function (thisline) {
    product_qty += (thisline.product_qty || 0);
  });
  await requisitionObj.directUpdate(requisitionId, { amount_qty: product_qty });
}

module.exports = {
  caculateAmount
};