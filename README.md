Steps to run the project:
-------------------------

1. git clone
2. run 'npm install'
3. install mysql and redis locally and do setups accordingly
4. Use postman to test the APIs.

APIs List with sample data:
---------------------------

1. Auth APIs:
   ---------
   1.1 User Registration
   ---------------------
   URL: localhost:8800/hotel/bookings/api/auth/register
   Method: POST
   Body:
         {
            "userName": "Zaved Khan",
            "email": "izaved@gmail.com",
            "mobile": "234524553",
            "password": "Zaved@246",
            "confirmPassword": "Zaved@246",
            "isAdmin": 1
        }
   Response:
         {
          "success": true,
          "message": "User Registration Successful"
         }
   <img width="1002" alt="Screenshot 2024-03-15 at 4 10 20 PM" src="https://github.com/Sultan-Lodhi/Hotel-Booking-APIs/assets/78294923/ad056f51-5f23-4b36-9472-725a1bd3b940">

   
   2.2 User Login
   --------------
   URL: localhost:8800/hotel/bookings/api/auth/login
   Method: POST
   Body:
         {
            "userEmailMobile": "234524553",
            "password": "Zaved@246"
         }
   Response:
        {
            "success": true,
            "message": "User login successful",
            "data": {
                "token":   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzEwNDkwMzMzLCJleHAiOjE3MTA0OTM5MzN9.Z5VOw7SgZwM8Odo8EAldxMW5qHGT1GippBrc-ATXc30",
                "user": {
                    "id": 3,
                    "userName": "Zaved Khan",
                    "email": "izaved@gmail.com",
                    "mobile": "234524553",
                    "isAdmin": true,
                    "isActive": true
                }
            }
        }
   <img width="1003" alt="Screenshot 2024-03-15 at 4 12 09 PM" src="https://github.com/Sultan-Lodhi/Hotel-Booking-APIs/assets/78294923/014bbc1f-80b9-4498-9b64-36033961c0a5">


3. Hotel APIs:
   ---------
   2.1 Create Hotel
   ---------------------
   URL: localhost:8800/hotel/bookings/api/hotel
   Method: POST
   Authorization: Select type 'Bearer Token' in POSTMAN and add token generated from login API. If session time out then hiot login api 
                  again to generate the new token and use that token to test APIs.
   Body:
          {
              "hotelName": "Dummy Hotel",
              "city": "Pune",
              "address": "Magarpatta",
              "rating": 1
          }
   Response:
         {
          "success": true,
          "message": "Hotel Added Successfully"
         }

   2.2 Get Hotels
   ---------------------
   URL: localhost:8800/hotel/bookings/api/hotel
   Method: GET
   Authorization: Select type 'Bearer Token' in POSTMAN and add token generated from login API. If session time out then hiot login api 
                  again to generate the new token and use that token to test APIs.
   Query Params: to search hotel name use { hotelName: 'Hyatt' }.
   Response:
    {
        "success": true,
        "message": "Hotels data fetched successfully",
        "data": [
            {
                "id": 1,
                "hotelName": "Hyatt Regency",
                "city": "Delhi",
                "address": "rk puram, south delhi",
                "rating": 5,
                "createdOn": "2024-03-15T07:12:07.000Z",
                "modifiedOn": "2024-03-15T07:12:07.000Z"
            },
            {
                "id": 2,
                "hotelName": "JW MARRIOT",
                "city": "Mumbai",
                "address": "Andheri West",
                "rating": 3,
                "createdOn": "2024-03-15T07:12:48.000Z",
                "modifiedOn": "2024-03-15T07:12:48.000Z"
            },
            {
                "id": 3,
                "hotelName": "Radisson Blue",
                "city": "Pune",
                "address": "Magarpatta",
                "rating": 5,
                "createdOn": "2024-03-15T07:35:12.000Z",
                "modifiedOn": "2024-03-15T07:35:12.000Z"
            }
        ]
    }

   2.3 Update Hotel
   ---------------------
   URL: localhost:8800/hotel/bookings/api/hotel
   Method: PUT
   Authorization: Select type 'Bearer Token' in POSTMAN and add token generated from login API. If session time out then hiot login api 
                  again to generate the new token and use that token to test APIs.
   Body:
          {
              "id": 2,
              "rating": 3
          }
   Response:
         {
          "success": true,
          "message": "Hotel Updated Successfully"
         }

   2.4 Delete Hotel
   ---------------------
   URL: localhost:8800/hotel/bookings/api/hotel/4
   Method: DELETE
   Authorization: Select type 'Bearer Token' in POSTMAN and add token generated from login API. If session time out then hiot login api 
                  again to generate the new token and use that token to test APIs.
   PARAMS: Mentioned in URL Path itself. '.../4'
   Response:
         {
          "success": true,
          "message": "Hotel Deleted Successfully"
         }

4. Hotel Rooms APIs:
   ---------
   3.1 Create Room
   ---------------------
   URL: localhost:8800/hotel/bookings/api/room
   Method: POST
   Authorization: Select type 'Bearer Token' in POSTMAN and add token generated from login API. If session time out then hiot login api 
                  again to generate the new token and use that token to test APIs.
   Body:
         {
             "hotelId": 1,
             "roomNo": 301,
             "floor": 3,
             "roomPrice": 2500
         }
   Response:
         {
          "success": true,
          "message": "Room Added Successfully"
         }

   3.2 Get Rooms
   ---------------------
   URL: localhost:8800/hotel/bookings/api/room?hotelId=1
   Method: GET
   Authorization: Select type 'Bearer Token' in POSTMAN and add token generated from login API. If session time out then hiot login api 
                  again to generate the new token and use that token to test APIs.
   QUERY Params: { hotelId: 1}
   Response:
            {
                "success": true,
                "message": "Room fetched successfully",
                "data": [
                    {
                        "id": 1,
                        "hotelId": 1,
                        "roomNo": 101,
                        "floor": 1,
                        "roomPrice": 1000,
                        "isBooked": false,
                        "createdOn": "2024-03-15T08:00:36.000Z",
                        "modifiedOn": "2024-03-15T08:00:36.000Z",
                        "hotel_id": 1
                    },
                    {
                        "id": 2,
                        "hotelId": 1,
                        "roomNo": 102,
                        "floor": 1,
                        "roomPrice": 1000,
                        "isBooked": false,
                        "createdOn": "2024-03-15T08:00:45.000Z",
                        "modifiedOn": "2024-03-15T08:00:45.000Z",
                        "hotel_id": 1
                    }
                ]
            }

   3.3 Update Room
   ---------------------
   URL: localhost:8800/hotel/bookings/api/room
   Method: PUT
   Authorization: Select type 'Bearer Token' in POSTMAN and add token generated from login API. If session time out then hiot login api 
                  again to generate the new token and use that token to test APIs.
   Body:
         {
             "id": 5,
             "roomPrice": 2000
         }
   Response:
         {
          "success": true,
          "message": "Room Updated Successfully"
         }

   3.4 Delete Room
   ---------------------
   URL: localhost:8800/hotel/bookings/api/room/5
   Method: DELETE
   Authorization: Select type 'Bearer Token' in POSTMAN and add token generated from login API. If session time out then hiot login api 
                  again to generate the new token and use that token to test APIs.
   PARAMS: Mentioned in URL Path itself. '.../5'
   Response:
         {
          "success": true,
          "message": "Room Deleted Successfully"
         }

5. Hotel Rooms APIs:
   ---------
   4.1 Make Booking
   ---------------------
   URL: localhost:8800/hotel/bookings/api/booking
   Method: POST
   Authorization: Select type 'Bearer Token' in POSTMAN and add token generated from login API. If session time out then hiot login api 
                  again to generate the new token and use that token to test APIs.
   Body:
         {
             "userId": 1,
             "hotelId": 1,
             "roomId": 2
         }
   Response:
         {
          "success": true,
          "message": "Hotel Booked Successfully"
         }

   4.2 View Bookings
   ---------------------
   URL: localhost:8800/hotel/bookings/api/booking?userId=1
   Method: GET
   Authorization: Select type 'Bearer Token' in POSTMAN and add token generated from login API. If session time out then hiot login api 
                  again to generate the new token and use that token to test APIs.
   QUERY Params: { userId: 1}
   Response:
            {
                "success": true,
                "message": "User bookings fetched successfully",
                "data": [
                    {
                        "id": 1,
                        "userId": 1,
                        "hotelId": 1,
                        "roomId": 1,
                        "createdOn": "2024-03-15T08:22:51.000Z",
                        "modifiedOn": "2024-03-15T08:22:51.000Z",
                        "user_id": 1,
                        "hotel_id": 1,
                        "room_id": 1,
                        "hotel": {
                            "id": 1,
                            "hotelName": "Hyatt Regency",
                            "city": "Delhi",
                            "address": "rk puram, south delhi",
                            "rating": 5,
                            "createdOn": "2024-03-15T07:12:07.000Z",
                            "modifiedOn": "2024-03-15T07:12:07.000Z"
                        },
                        "hotelRoom": {
                            "id": 1,
                            "hotelId": 1,
                            "roomNo": 101,
                            "floor": 1,
                            "roomPrice": 1000,
                            "isBooked": true,
                            "createdOn": "2024-03-15T08:00:36.000Z",
                            "modifiedOn": "2024-03-15T08:00:36.000Z",
                            "hotel_id": 1
                        }
                    }
                ]
            }

   4.3 Cancel Booking
   ---------------------
   URL: localhost:8800/hotel/bookings/api/booking/2
   Method: DELETE
   Authorization: Select type 'Bearer Token' in POSTMAN and add token generated from login API. If session time out then hiot login api 
                  again to generate the new token and use that token to test APIs.
   PARAMS: in URL -- '.../2'
   Response:
         {
          "success": true,
          "message": "Booking cancelled successfully"
         }


Below are some screenshots of the swagger(OpenAPI 3.0 version) API Documentation UI:
--------------------------------------------------------------------------------------
<img width="1418" alt="Screenshot 2024-03-15 at 4 01 57 PM" src="https://github.com/Sultan-Lodhi/Hotel-Booking-APIs/assets/78294923/16c1715b-1517-4dd7-94f4-8fea07bababc">

<img width="1418" alt="Screenshot 2024-03-15 at 4 05 38 PM" src="https://github.com/Sultan-Lodhi/Hotel-Booking-APIs/assets/78294923/378a560a-88f8-488a-8d6a-678c1086b5ce">

<img width="1409" alt="Screenshot 2024-03-15 at 4 08 04 PM" src="https://github.com/Sultan-Lodhi/Hotel-Booking-APIs/assets/78294923/2bfeb173-022e-4115-b057-9e130b255784">

