curl -s -c cookies.txt -X POST -H "Content-Type: application/json" -d '{"username":"student123","password":"password123"}' http://localhost:5000/customer/login
{"message":"Login successful!"}
