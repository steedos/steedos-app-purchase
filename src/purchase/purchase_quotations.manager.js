const objectql = require('@steedos/objectql');
/**
 * 
 * @param {string} quotationId 
 */

async function caculateAmount(quotationId) {
  if (!quotationId) {
    return;
  }
  const steedosSchema = objectql.getSteedosSchema();
  let quotationObj = steedosSchema.getObject('purchase_quotations');

  let quotation = await quotationObj.findOne(quotationId);
  if (!quotation) {
    console.error(`未找到询价报价：${quotationId}`);
    return;
  }

  let product_qty = 0;
  let price_subtotal = 0;
  let price_subtotal_excluding_tax = 0;
  let tax = 0;
  (await steedosSchema.getObject('purchase_quotations_lines').find({ filters: [['parent_id', '=', quotationId]] })).forEach(function (thisline) {
    product_qty += (thisline.product_qty || 0);
    price_subtotal += (thisline.price_subtotal || 0);
    price_subtotal_excluding_tax += (thisline.price_subtotal_excluding_tax || 0);
    tax += (thisline.tax || 0);
  });
  await quotationObj.directUpdate(quotationId, { amount_qty: product_qty , amount_total: price_subtotal , amount_untaxed: price_subtotal_excluding_tax , amount_tax: tax});
}

module.exports = {
  caculateAmount
};