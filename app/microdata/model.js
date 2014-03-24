import attr from "appkit/microdata/attr";

export default Ember.Object.extend({
  firstName: attr(),
  lastName: attr()
});
