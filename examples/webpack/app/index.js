var riot = require('riot');
// Provide some settings
riot.settings.brackets = '{{ }}';
// Get application tag and mount it! Yeah baby!
require('./app.tag');
riot.mount('app');
