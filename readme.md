## I. Basic server

run webserver,
open altair (https://altair-gql.firebaseapp.com/) and set url to http://localhost:3000/graphql in Safari or in altair desktop (in Chrome problem with mixed content http vs https)

*run query:*
```
query{
  books {
    title
    author
  }
}
```

