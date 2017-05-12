module.exports.onStage = test => {
  if(process.env.NODE_ENV === 'stage'){
    test.skip();
  }
};
