
#determin which branch current is
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

#unzip the output.tar
tar -xzf output.tar.gz
gulp
tar -czf output.tar.gz output
git add .
git commit -m $1
git push origin $branch
