#!/bin/bash
echo "Deploy to '$1'"
if [ $1 = 'production' ]; then
  DEP_ENV='PRODUCTION'
  DEP_TARGET='rurihikohara@rurihikohara.sakura.ne.jp:/home/rurihikohara/www/niwa-archives.org'
  DEP_PORT='22'
elif [ $1 = 'staging' ]; then
  DEP_ENV='STAGING'
  DEP_TARGET='rurihikohara@rurihikohara.sakura.ne.jp:/home/rurihikohara/www/stg.niwa-archives.org'
  DEP_PORT='22'
elif [ $1 = 'ycam' ]; then
  DEP_ENV='PRODUCTION'
  DEP_TARGET='www@niwa2.ycam.jp:/home/www/html/niwa2'
  DEP_PORT='10022'
elif [ $1 = 'karappojp' ]; then
  DEP_ENV='PRODUCTION'
  DEP_TARGET='karappojp@karappojp.sakura.ne.jp:/home/karappojp/www/karappo.jp/niwa'
  DEP_PORT='22'
else
  echo "引数にデプロイ先( production | staging | ycam | karappojp )を指定してください。"
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
    find ./dist/ -name "*$ext" -exec rm {} \; # delete backup files
    # Deploy
    rsync -aIzhv --stats --delete -e "ssh -p $DEP_PORT" "--exclude-from=$PWD/.depignore" ./dist/ $DEP_TARGET
    npm run rename-back
  fi
fi
