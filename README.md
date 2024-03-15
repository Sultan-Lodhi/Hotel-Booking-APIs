(NOTE: To view this file in better way click on 'raw')
------------------------------------------------------

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

2. Hotel APIs:
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
