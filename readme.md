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

### III. Sample mutation

add subscription

*run mutation*
```
mutation{
  sayHi(name: "Mutation Sample")
}
```

watch server console

### IV. Add subscriptions

add packages `npm i graphql-subscriptions subscriptions-transport-ws`  
update `index.js` to register websocker subscriptions  
update `schema` - add subscription and update mutation

set subscription url to `ws://localhost:3000/subscriptions`  
*add subscription to second tab*
```
subscription {
  greeting
}
```

*and run mutation in first tab*

### V. Add onConnect and onDisconnect

add `onConnect` and `onDisconnect`
start and stop subscriptions  
see console