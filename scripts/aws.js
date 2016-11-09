const yargs = require('yargs');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const ecs = new AWS.ECS();

const IMAGE_NAME = yargs.argv.i;
const PROJECT_NAME = yargs.argv.p;
const ENV = yargs.argv.e;

const SERVICE_NAME = ENV + '-' + PROJECT_NAME.replace(/\//gi, '-');


// Modifing the task definition
const taskDef = require(`../aws-task-def/task-${ENV}.json`);
taskDef.containerDefinitions[0].image = IMAGE_NAME;
taskDef.containerDefinitions[0].name = SERVICE_NAME;
taskDef.family = SERVICE_NAME;

// Register Task Definition
console.log('➜  Register Task Definition');
ecs.registerTaskDefinition(taskDef, function(err, data) {
  if (err) {
    console.error(err, err.stack);
    process.exit(1);
  }
  console.log('➜  ✓');

  // Get the Task Definition Arn and inject to serive Definition
  const taskDefinitionArn = data.taskDefinition.taskDefinitionArn;
  const params = {
    service: SERVICE_NAME,
    cluster: `sf-${ENV}`,
    taskDefinition: taskDefinitionArn
  };

  // Update service Definition
  console.log('➜  Update service Definition');
  ecs.updateService(params, function(err) {
    if (err) {
      console.error(err, err.stack);
      process.exit(1);
    }
    console.log('➜  ✓');
    console.log('Task Definition Arn: ', taskDefinitionArn); // successful response
  });
});
