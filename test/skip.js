const skipIf = (test, conditionOn) => {
  if (conditionOn(process.env.NODE_ENV)) test.skip();
};
const inStage = env => env === 'stage';
const notInProduction = env => env !== 'production';

module.exports = testing => {
  return {
    onStage: () => skipIf(testing, inStage),
    unlessProduction: () => skipIf(testing, notInProduction)
  };
};
