export default Ember.Object.extend({

  init: function() {
    this.set('identityMap', {});
  },

  buildRecord: function (type, data, store) {
    var id = data.id;
    var containerKey = 'model:' + type;
    var factory = store.container.lookupFactory(containerKey);
    var record = factory.create({
      id: id,
      $data: data
    });
    this.identityMapForType(type, store)[id] = record;
    return record;
  },

  identityMapForType: function (type, store) {
    var typeIdentityMap = store.get('identityMap');
    var idIdentityMap = typeIdentityMap[type] || {};
    typeIdentityMap[type] = idIdentityMap;
    return idIdentityMap;
  },

  push: function(type, data) {
    var record = this.getById(type, data.id);
    if (record) {
      record.set('$data', data);
    } else {
      record = this.buildRecord(type, data, this);
    }
    return record;
  },

  getById: function(type, id) {
    var identityMap = this.identityMapForType(type, this);
    return identityMap[id] || null;
  }
});