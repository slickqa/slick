#!/bin/bash

BASEDIR=$(dirname $(readlink -f $0))

tmux new-session -t slick-dev-server -d 
tmux set-option -t slick-dev-server mouse on
tmux send -t slick-dev-server "cd $BASEDIR; go build; ./slick serve -dev"
tmux send -t slick-dev-server Enter


tmux split-window -t slick-dev-server

tmux send -t slick-dev-server "cd $BASEDIR/web; npm install; npm run dev;"
tmux send -t slick-dev-server Enter

tmux rename-window -t slick-dev-server "Slick Dev Server"
tmux attach -t slick-dev-server
