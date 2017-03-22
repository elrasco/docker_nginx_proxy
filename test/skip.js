const unlessProduction = test => {
  if(process.env.NODE_ENV != 'production'){
    test.skip();
  }
};

module.exports = {
  unlessProduction
};
