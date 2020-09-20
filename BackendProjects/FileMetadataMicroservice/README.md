# File Metadata Microservice

Node JS powered application written in express framework. A user can upload file to this service and get metadata about the upload file

[Live Application](https://VagueBlaringAutoresponder--five-nine.repl.co)

### Detailed User Stories

- A user can submit a FormData object that includes a file upload.
- When user submits something, user will receive the file size in bytes within the JSON response.

### Sample Response

```javascript
{
   "name":"8-bit.png",
   "type":"image/png",
   "size":28309
}
```
