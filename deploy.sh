# $1 back || front

# project name
PROJECT_NAME="chanyeong-$1"

cd /home/ubuntu/$1

# pm2 ecosystem deploy
if pm2 list | grep -q ${PROJECT_NAME}
then
  pm2 reload pm2.yml --only ${PROJECT_NAME}
  echo "pm2 reload"
else
  pm2 start pm2.yml --only ${PROJECT_NAME}
  echo "pm2 start"
fi