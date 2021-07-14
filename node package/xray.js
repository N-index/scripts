const Xray = require('x-ray');

const get_content = async () => {
  
  const x = Xray({
    filters: {
      trim: function (val) {
        return typeof val === 'string' ? val.trim() : val;
      }
    }
  });

  const items = await x('http://germ.run', '.pop ul', ['li | trim']);
  console.log(items);
};
get_germ_content();
