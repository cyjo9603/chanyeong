if pm2 list | grep -q chanyeong-server
then
  pm2 reload pm2.yml chanyeong-server
  echo "pm2 reload"
else
  pm2 start pm2.yml chanyeong-server
  echo "pm2 start"
fi