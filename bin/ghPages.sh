#!/bin/bash

# Note: this is partially copied from https://github.com/guahanweb/action-nodejs-gh-pages/blob/master/helpers.sh

# This function checks for some of the necessary environment variables
# that are provided by GH for interaction with the repo
function ghActionsSetup {
  # required variables
  if [[ -z "$GITHUB_TOKEN" || -z "$GITHUB_REPOSITORY" || -z "$GITHUB_ACTOR" ]]; then
    echo "[ERROR] Environment is not set up appropriately: missing GH variables"
    exit 1
  fi

  export REMOTE_REPO="https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
  export SCRIPT_USER="${GITHUB_ACTOR}"
  export SCRIPT_EMAIL="${GITHUB_ACTOR}@users.noreply.github.com"

  echo "[INFO] repo=$REMOTE_REPO"
}

function ghPages {
  ghActionsSetup
  export BUILD_DIR=${BUILD_DIR:-"build"}
  export REMOTE_BRANCH=${REMOTE_BRANCH:-"gh-pages"}

  # navigate into build directory
  cd $BUILD_DIR

  # initialize the repo, and be sure we identify as the triggering user
  git init && \
  git config user.name "${SCRIPT_USER}" && \
  git config user.email "${SCRIPT_EMAIL}" && \
  git add . && \
  echo -n 'Files to Commit:' && ls -l | wc -l && \
  git commit -m 'action build' > /dev/null 2>&1 && \
  echo "[INFO] git cmd: git push --force ${REMOTE_REPO} master:${REMOTE_BRANCH}" && \
  git push --force ${REMOTE_REPO} master:${REMOTE_BRANCH} > /dev/null && \
  rm -rf .git

  # navigate back to the previous directory
  cd -
}
ghPages