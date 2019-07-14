FROM alpine/git as source

ENV HUGO_VERSION 0.55.6
RUN wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz && \
    tar -xvf hugo_${HUGO_VERSION}_Linux-64bit.tar.gz && \
    mv hugo /usr/local/bin/hugo

WORKDIR /src

COPY . .

RUN git submodule update --init --recursive

RUN hugo

FROM nginx:1.17.0-alpine
COPY --from=source /src/public /usr/share/nginx/html

