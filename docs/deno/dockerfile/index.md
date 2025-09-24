# Dockerfile

```dockerfile
FROM happyplum/deno:latest

EXPOSE 8080

ADD ./server ./notes/server

CMD ["./notes/server"]
```
