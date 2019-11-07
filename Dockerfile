FROM golang:1.12-alpine3.9

COPY . /gosrc
WORKDIR /gosrc
RUN go build -mod=vendor -o api

FROM alpine:3.9
# TODO. Change this email to yours!
LABEL maintainer="tomas.adomavicius@centric.eu"

RUN apk --no-cache add ca-certificates
WORKDIR /api
COPY --from=0 /gosrc/api api
COPY static /api/static
ENV PATH="/api/:${PATH}"

EXPOSE 8080
CMD ["api", "server"]