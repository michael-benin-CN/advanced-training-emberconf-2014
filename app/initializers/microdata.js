import Store from '../microdata/store';

var microdataInitializer = {
  name: 'microdata',

  initialize: function(container, application) {

    application.register(
      'store:main',
      Store
    );

    application.inject(
      'controller',
      'store',
      'store:main'
    );
  }
};

export default microdataInitializer;