# $1 back || front

# project name
PROJECT_NAME="chanyeong-$1"

cd $1

# modules install
yarn install
echo 'yarn install'

# front setting
if [ $1 == 'front' ];
then

  if !(ls src | grep types)
  then
    mkdir src/types
    echo 'mkdir types'
  fi

  yarn types
  echo 'yarn types'
fi

# project build
yarn build
echo 'yarn build'

# pm2 ecosystem deploy
if pm2 list | grep -q ${PROJECT_NAME}
then
  pm2 reload pm2.yml --only ${PROJECT_NAME}
  echo "pm2 reload"
else
  pm2 start pm2.yml --only ${PROJECT_NAME}
  echo "pm2 start"
fi