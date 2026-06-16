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

# nuxt dev で汚染された .nuxt を持ち込まないよう、generate 前に必ずクリーンする
rm -rf .nuxt .output

if pnpm run generate; then
  # dev ビルド成果物の混入チェック（@vite/client が残っていたら壊れた成果物なので転送中止）
  # nuxt dev 後にクリーンせず generate すると HTML に dev 用 entry が焼き込まれることがある
  if grep -rql '@vite/client' ./dist/*.html 2>/dev/null; then
    echo "[DEPLOY] ERROR: dev ビルド成果物 (@vite/client) を検出しました。転送を中止します。" >&2
    echo "[DEPLOY]   .nuxt / .output を削除してから generate し直してください。" >&2
    exit 1
  fi
  # Remove useless files
  find ./dist/ -name '.DS_Store' -type f -delete
  find ./dist/ -name '.nojekyll' -type f -delete

  # rename
  mv ./dist/htaccess ./dist/.htaccess

  # remove "DEP_XXX_RM "
  ext=".temp_bakup" # extension of backup files which are created before replacement
  find ./dist/ -name "*.htaccess" -exec sed -i$ext "s|#DEP_REMOTE_RM ||" {} \;
  find ./dist/ -name "*.htaccess" -exec sed -i$ext "s|#DEP_"$DEP_ENV"_RM ||" {} \;
  find ./dist/ -name "*$ext" -exec rm {} \; # delete backup files
  # Deploy
  rsync -aIzh --perms --owner --group --stats --delete -e "ssh -p $DEP_PORT" "--exclude-from=$PWD/.depignore" ./dist/ $DEP_TARGET

  # rename back
  mv ./dist/.htaccess ./dist/htaccess
fi
