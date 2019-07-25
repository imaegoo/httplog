### HTTPLOG

Log all received HTTP request! (and then return 200 OK)
Used for webhook & HTTP callback testing

Output sample:
```
info: 2019-07-25 18:04:36
	POST /v1.0/standard
	Query:
		search: keyword
	Header:
		cache-control: no-cache
		postman-token: f4103067-4b07-447d-9fab-f09a75b6ddda
		content-type: application/json
		user-agent: PostmanRuntime/3.0.11-hotfix.2
		accept: */*
		host: localhost:4000
		accept-encoding: gzip, deflate
		content-length: 209
		connection: keep-alive
	Body:
		appId: XXX
		data:
			userId: 123
			requestId: 456
		timestamp: 0
```

Usage:
```
npm install
node app.js
```
