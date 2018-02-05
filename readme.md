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

## II. Query samples

add more queryes: `sum` and `time`.
Example of params, descriptions
Multiple results in one query

```
query{
  books {
    author
  }
  sum(n1:1, n2:2)
  time
}
```