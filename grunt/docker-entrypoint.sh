#! /bin/bash --login

# "exec" seems like a much simpler solution for this,
# but node appears to ignore the SIGTERM
_term () {
  echo 'Caught SIGTERM'
  kill -TERM "$child"
}
trap _term SIGTERM


# start grunt in watch mode
grunt watch &


child=$!
wait "$child"
