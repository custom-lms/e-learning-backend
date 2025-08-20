## cURL statements

### LOGIN as SUPERADMIN

curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "prakashdas18@gmail.com", "password": "123456"}'


### Add subject to a board

curl -X POST http://localhost:5000/api/subjects/{boardId} \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer {place_your-authenticated_SUPERADMIN_token_here}" \
     --data '{"name": "Maths", "language": "Assamese"}'



### LOGIN as STUDENT (Frontend)
 - rockteam@gmail.com
 - 123456

