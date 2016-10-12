#!/usr/bin/env python3
"""Build and debloy the project as docker container."""

import argparse
import base64
import json
import os
import sys
import time

from docker import Client

import boto3
from git import Repo

cli = Client(base_url='unix://var/run/docker.sock')
ecs = boto3.client(
    'ecs',
    region_name='eu-west-1',
    aws_access_key_id='AKIAJFKJMCZC3VNDMSIA',
    aws_secret_access_key='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')
ecr = boto3.client(
    'ecr',
    region_name='eu-west-1',
    aws_access_key_id='AKIAJFKJMCZC3VNDMSIA',
    aws_secret_access_key='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')


def createNewTaskRevision(taskDef):
    """creating a new task revision."""
    return ecs.register_task_definition(
        family=taskDef.get('family'),
        containerDefinitions=taskDef.get('containerDefinitions'), )


def updateSerivce(taskDef, serviceName, env):
    """updating the service to the new task."""
    return ecs.update_service(cluster="sf-{}".format(env),
                              service="{}-{}".format(env, serviceName),
                              taskDefinition=taskDef)

###################################################################
#                           Init Stage
###################################################################

# Git init
full_path = os.path.dirname(os.path.realpath(__file__))
projectName = "/".join(full_path.split('/').pop().split('_'))
serviceName = "-".join(full_path.split('/').pop().split('_'))
repo = Repo(full_path)
git = repo.git

# Args init
parser = argparse.ArgumentParser()

parser.add_argument("-b", "--branch", help="Branch name")
parser.add_argument("-t", "--tag", help="Docker tag")
parser.add_argument("-e", "--env", help="Envioment")

args = parser.parse_args()
branch = args.branch if args.branch else repo.heads[0].name
env = args.env if args.env else 'prod'

# Tag init
tag = args.tag if args.tag else env

# Put the currant time on th tag
tag = tag + time.strftime("-%Y-%m-%d-%H-%M", time.localtime())


print("\n\n\n-------------------ENV VARS--------------------")
print("--")
print("--     Branch:  {}".format(branch))
print("--     Env:     {}".format(env))
print("--     Tag:     {}".format(tag))
print("--")
print("-----------------------------------------------\n\n\n")

###################################################################
#                           Git Stage
###################################################################

print("→ Checkout to {}".format(branch))
response = git.checkout(branch)
print(response)

print("→ Pull {}".format(branch))
response = git.pull()
print(response)

###################################################################
#                           Docker Stage
###################################################################

# → AWS ECR Login
print("→ AWS ECR Login ")
auth = ecr.get_authorization_token()
authorizationToken = base64.standard_b64decode(auth.get('authorizationData')[
    0].get('authorizationToken')).decode('UTF-8').split(':')[1]
proxyEndpoint = auth.get('authorizationData')[0].get('proxyEndpoint')

# → Docker Login
print("→ Docker Login ")
response = cli.login(username='AWS',
                     password=authorizationToken,
                     registry=proxyEndpoint,
                     reauth=True)
if (response.get('Status') != 'Login Succeeded'):
    print('Login Failed')
    sys.exit()
print(response.get('Status'))

# → Docker Build
print("→ Docker Build ")
response = cli.build(path='Dockerfile.{}'.format(env),
                     rm=True,
                     tag="{}:{}".format(projectName, tag),
                     decode=True)

for line in response:
    print(line.get('stream'))

# → Docker Tag
print("→ Docker Tag ")
response = cli.tag(
    image="{}:{}".format(projectName, tag),
    repository="315671387076.dkr.ecr.eu-west-1.amazonaws.com/{}".format(
        projectName),
    tag=tag)
print(response)

# → Docker Push
print("→ Docker Push ")
response = cli.push(
    repository="315671387076.dkr.ecr.eu-west-1.amazonaws.com/{}".format(
        projectName),
    tag=tag,
    stream=True,
    decode=True)

images = {}
general = []
for line in response:
    for image in images:
        sys.stdout.write("\033[F")
    for gen in general:
        sys.stdout.write("\033[F")
    if (('id' in line)):
        image_id = line.get('id')
        status = line.get('status') if 'status' in line else ''
        progress = line.get('progress') if 'progress' in line else ''
        images[image_id] = "{} - Status: {}   {}".format(image_id, status,
                                                         progress)
    else:
        general.append(line)
    for k, v in images.items():
        print("{}".format(v))
    for gen in general:
        print(gen)

# → Docker Remove
print("→ Docker Remove ")

response = cli.remove_image(
    image="315671387076.dkr.ecr.eu-west-1.amazonaws.com/{}:{}".format(
        projectName, tag),
    force=True)
response = cli.remove_image(image="{}:{}".format(projectName, tag), force=True)

###################################################################
#                           AWS Stage
###################################################################

# → Create a new task revision
print("→ Create a new task revision")

taskDef = json.load(open("aws-task-def/task-{}.json".format(env)))
taskDef.get('containerDefinitions')[0]["image"] = (
    "315671387076"
    ".dkr.ecr.eu-west-1.amazonaws.com/"
    "{}:{}".format(projectName, tag))

response = createNewTaskRevision(taskDef)
taskDefinitionArn = response.get('taskDefinition').get('taskDefinitionArn')

# → Update the service task
print("→ Update the service task")
updateSerivce(taskDefinitionArn, serviceName, env)

print("\n\n\n-------------------ENV VARS--------------------")
print("--")
print("--     Branch:  {}".format(branch))
print("--     Env:     {}".format(env))
print("--     Tag:     {}".format(tag))
print("--")
print("-----------------------------------------------\n\n\n")
