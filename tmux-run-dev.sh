#!/bin/bash

BASEDIR=$(dirname $(readlink -f $0))

tmux new-session -s slick-dev-server -d "cd $BASEDIR; go build; ./slick serve -dev"

tmux split-window -t slick-dev-server "cd $BASEDIR/web; npm install; npm run dev;"

tmux set-option -t slick-dev-server mouse on

tmux rename-window -t slick-dev-server "Slick Dev Server"

tmux attach -t slick-dev-server
