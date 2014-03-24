function buildRecord(type, data, store) {
  var containerKey = 'model:' + type;

  var factory = store.container.lookupFactory(containerKey);

  var record = factory.create({
    id: data.id,
    $data: data
  });

  var id = data.id;

  identityMapForType(type, store)[id] = record;

  return record;
}

function identityMapForType(type, store) {
  var typeIdentityMap = store.get('identityMap');

  var idIdentityMap = typeIdentityMap[type] || {};
  typeIdentityMap[type] = idIdentityMap;

  return idIdentityMap;
}

export default Ember.Object.extend({
  init: function() {
    this.set('identityMap', {});
  },

  push: function(type, data) {
    var record = this.getById(type, data.id);

    if (record) {
      record.set('$data', data);
    } else {
      record = buildRecord(type, data, this);
    }

    return record;
  },

  getById: function(type, id) {
    var identityMap = identityMapForType(type, this);

    return identityMap[id] || null;
  }
});