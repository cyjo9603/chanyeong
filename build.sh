# $1 back || front

# project name
PROJECT_NAME="chanyeong-$1"

cd /home/ubuntu/$1

git pull

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