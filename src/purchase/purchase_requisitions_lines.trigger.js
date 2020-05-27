/*
所有脚本函数均为无参函数，所属数据可从this中获取，this结构如下
id: 记录的唯一标识[string],
userId: 当前用户唯一标识[string],
spaceId: 当前工作区[string],
doc: 需要新增/修改的记录内容[json],
previousDoc: 修改/删除前的记录[json], //仅afterUpdate, afterDelete时存在此属性
object_name: 当前对象名称[string],
datasource_name: 数据源名称[string],
getObject: function(object_name: string)
query: 查询数据相关参数[json], //仅beforeFind时存在此属性
*/

const prManager = require('./purchase_requisitions.manager');

module.exports = {
  listenTo: 'purchase_requisitions_lines',
  beforeInsert: async function () {
    let doc = this.doc;
    if (doc.product_id) {
      let product = await this.getObject('products').findOne(doc.product_id);
      doc.product_code = product.code;
      doc.product_description = product.description;
      doc.unit = product.unit;
    }
  },
  beforeUpdate: async function () {
    var doc = this.doc;
    let product = {};
    if (doc.product_id) {
      product = await this.getObject('products').findOne(doc.product_id);
    }
    doc.product_code = product.code || '';
    doc.product_description = product.description || '';
    doc.unit = product.unit || '';
  },

  afterInsert: async function () {
    await prManager.caculateAmount(this.doc.parent_id);
  },

  afterUpdate: async function () {
    let doc = await this.getObject('purchase_requisitions_lines').findOne(this.id, { fields: ['parent_id'] });
    await prManager.caculateAmount(doc.parent_id);
  },

  afterDelete: async function () {
    await prManager.caculateAmount(this.previousDoc.parent_id);
  },

}