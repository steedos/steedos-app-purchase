module.exports = {
  initiateAcceptance: function(){
    toastr.success("发起验收，待开发");
  },

  initiateAcceptanceVisible: function(){
    return true
  }
}