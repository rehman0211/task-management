# Node.js PostgreSQL CRUD for Task-Management app

Full Article with implementation:
> Using Node.js and PostgreSQL with Express

Environment:
- Node-version: v20.6.1
- pg: v8.11.0
- express: v4.18.2

I have build Rest CRUD APIs for managing tasks and API to get the metrics for your tasks.

The following table shows overview of the Rest APIs that will be exported:

- GET     `api/task?page=1&pageSize=10`	            get all Tasks `[Using Paginations]`
- GET     `api/task/:id`         get Task by id
- POST    `api/task`             add new Task `[Used Validators too]`
- PUT     `api/task/:id`         update Task by id `[Used Validators too]`
- DELETE  `api/task/:id`         remove Task by id
- GET     `api/get-task-metrics`   count task-metrics, count by status
- GET     `api/get-task-metrics-monthwise`  count task-metrics, count by status- `monthwise`

> By default, server will run on PORT : 8083

> Use BASE_URL : http://localhost:8083/

### API request-response Flow
`Request` at server --> `middlewares`[auth, requestValidators] --> `controllers`(controller-layer) --> `services`(service-layer) --> `databases`(database-layer) --> `service`->`controller`->`Response`

### MiddleWare (Additional feature)
> For Demo-purpose, I have introduced middle-wares, we can use for authentication & authorization.

We have added a auth-token to be passed in HEADERS, while calling API
```
Authorization: d2he3qb3g7rprsbfebfhyq73r
```

### Object Validation (Additional feature)
> As we are creating/updating the task, we need to validate the request-body

> we have created validations using `JOI` at `/validations/task.js`

## Project setup
```
npm install / yarn install
```

### Run
Please update .env file, according to system
```
node index.js
```

### API Curls:
GET: `{BASE_URL}/api/task?page=1&pageSize=10`
```
curl --location --request GET 'http://localhost:8083/api/task?page=0&pageSize=100' \
--header 'Authorization: d2he3qb3g7rprsbfebfhyq73r'
```

GET: `{BASE_URL}/api/task/:id`
```
curl --location --request GET 'http://localhost:8083/api/task/1' \
--header 'Authorization: d2he3qb3g7rprsbfebfhyq73r'
```

POST: `{BASE_URL}/api/task`
```
curl --location --request POST 'http://localhost:8083/api/task' \
--header 'Authorization: d2he3qb3g7rprsbfebfhyq73r' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Task 4",
    "remarks": "description"
}'
```

PUT: `{BASE_URL}/api/task/:id`
```
curl --location --request PUT 'http://localhost:8083/api/task/4' \
--header 'Authorization: d2he3qb3g7rprsbfebfhyq73r' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Task 4",
    "remarks": "description",
    "status": "COMPLETED"
}'
```

DELETE: `{BASE_URL}/api/task/:id`
```
curl --location --request DELETE 'http://localhost:8083/api/task/2' \
--header 'Authorization: d2he3qb3g7rprsbfebfhyq73r'
```

GET: `{BASE_URL}/api/get-task-metrics`
```
curl --location --request GET 'http://localhost:8083/api/get-task-metrics' \
--header 'Authorization: d2he3qb3g7rprsbfebfhyq73r'
```

GET: `{BASE_URL}/api/get-task-metrics-monthwise?startDate=02-09-1997&endDate=02-09-2024`
```
curl --location --request GET 'http://localhost:8083/api/get-task-metrics-monthwise?startDate=02-09-1997&endDate=02-09-2024' \
--header 'Authorization: d2he3qb3g7rprsbfebfhyq73r'
```