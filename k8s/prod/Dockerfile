FROM harbor.greypanel.com/library/node14-alpine
ADD ./sales-system /usr/local/
WORKDIR /usr/local/sales-system
EXPOSE 10087
ENV LC_ALL en_US.UTF-8
ENTRYPOINT ["npm","run","prod"]
