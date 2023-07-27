# Additional options passed in from the command line, e.g. the Makefile.
OPTIONS=$@

# Database credentials.
DB=mysql
USER=root
PASSWORD=root
NAME=magenta_tigers

$DB -u $USER -p$PASSWORD $NAME $OPTIONS
