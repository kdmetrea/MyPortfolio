FROM ubuntu:18.04
COPY Portfolio /Portfolio

WORKDIR /Portfolio

RUN apt-get update \
    && apt-get -y install python3-pip mariadb-server libmariadbclient-dev libjpeg-dev libpq-dev

RUN service mysql start \
    && mysql -u root -p -e "CREATE DATABASE myportfolio"

RUN pip3 install django django-rest-framework pillow django-extra-fields fuzzywuzzy mysqlclient psycopg2 django-imagekit

CMD [ "sh","./run.sh"]