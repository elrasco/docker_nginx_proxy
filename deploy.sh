#!/usr/bin/env bash

###################################################################
#                           Args process
###################################################################

while [[ $# -gt 1 ]]
do
  key="$1"
  case $key in
    -e|--env)
    ENV="$2"
    shift # past argument
    ;;
    -b|--branch)
    BRANCH="$2"
    shift # past argument
    ;;
    --default)
    DEFAULT=YES
    ;;
    *)
    # unknown option
    ;;
  esac
  shift # past argument or value
done

function box_out()
{
  local s=("$@") b w
  for l in "${s[@]}"; do
    ((w<${#l})) && { b="$l"; w="${#l}"; }
  done
  tput setaf 3
  echo " -${b//?/-}-
| ${b//?/ } |"
  for l in "${s[@]}"; do
    printf '| %s%*s%s |\n' "$(tput setaf 2)" "-$w" "$l" "$(tput setaf 3)"
  done
  echo "| ${b//?/ } |
 -${b//?/-}-"
  tput sgr 0
}

PREFIX='315671387076.dkr.ecr.eu-west-1.amazonaws.com'
TAG=$ENV-`date +%Y-%m-%d-%H-%M`
PROJECT_NAME='smallfish/proxy';
IMAGE_NAME=$PREFIX/$PROJECT_NAME:$TAG


box_out 'Project: '$PROJECT_NAME 'ENV: '$ENV 'Image: '$PROJECT_NAME:$TAG

{ # try
  box_out 'Git' &&
  bash scripts/pull.sh $BRANCH &&

  box_out 'Build' &&
  bash scripts/build.sh $ENV &&

  box_out 'Docker' &&
  bash scripts/docker.sh $PREFIX/$PROJECT_NAME $TAG &&

  box_out 'AWS' &&
  node scripts/aws.js -e $ENV -p $PROJECT_NAME -i $IMAGE_NAME &&

  box_out 'Project: '$PROJECT_NAME 'ENV: '$ENV 'Image: '$PROJECT_NAME:$TAG
} || { # catch
  box_out 'FAILED'
}
