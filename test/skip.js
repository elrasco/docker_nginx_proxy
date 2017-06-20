module.exports.onStage = test => {
  if(process.env.NODE_ENV === 'stage'){
    test.skip();
  }
};

module.exports.unlessProduction = test => {
  if(process.env.NODE_ENV !== 'production'){
    test.skip();
  }
};
