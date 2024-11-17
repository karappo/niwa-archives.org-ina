#!/bin/bash
echo "Deploy to '$1'"
if [ $1 = 'production' ]; then
  DEP_ENV='PRODUCTION'
  DEP_TARGET='rurihikohara@rurihikohara.sakura.ne.jp:/home/rurihikohara/www/niwa-archives.org/ina'
  DEP_PORT='22'
elif [ $1 = 'staging' ]; then
  DEP_ENV='STAGING'
  DEP_TARGET='rurihikohara@rurihikohara.sakura.ne.jp:/home/rurihikohara/www/stg.niwa-archives.org/ina'
  DEP_PORT='22'
else
  echo "引数にデプロイ先( production | staging )を指定してください。"
  exit 1
fi

if yarn generate; then
  # Remove useless files
  find ./dist/ -name '.DS_Store' -type f -delete
  find ./dist/ -name '.nojekyll' -type f -delete
  if npm run rename; then
    # remove "DEP_XXX_RM "
    ext=".temp_bakup" # extension of backup files which are created before replacement
    find ./dist/ -name "*.htaccess" -exec sed -i$ext "s|#DEP_REMOTE_RM ||" {} \;
    find ./dist/ -name "*.htaccess" -exec sed -i$ext "s|#DEP_"$DEP_ENV"_RM ||" {} \;
    find ./dist/ -name "*.php" -exec sed -i$ext "s|//DEP_REMOTE_RM ||" {} \;
    find ./dist/ -name "*.php" -exec sed -i$ext "s|//DEP_"$DEP_ENV"_RM ||" {} \;
    find ./dist/ -name "*$ext" -exec rm {} \; # delete backup files
    # Deploy
    rsync -aIzh --perms --owner --group --stats --delete -e "ssh -p $DEP_PORT" "--exclude-from=$PWD/.depignore" ./dist/ $DEP_TARGET
    npm run rename-back
  fi
fi
