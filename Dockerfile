FROM hayd/alpine-deno:1.7.2

EXPOSE 8080

WORKDIR /app

USER deno

#Cache external dependencies first
COPY src/deps.ts .
RUN deno cache --unstable deps.ts

ADD . .

RUN deno cache --unstable server.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-write", "--allow-read", "server.ts"]