# flytbase
Mission Controller
The Mission Controller module contains functions for handling mission-related operations. It includes the following functions:

createMission
The createMission function creates a new mission based on the provided request body. It performs the following steps:

Validates the request body using the express-validator library.
If there are any validation errors, it returns a 400 Bad Request response with the validation errors.
Extracts the mission data from the request body.
Performs additional validation checks on the required fields.
Retrieves details of the drone, category, site, and user associated with the mission from their respective models.
Checks if the retrieved details exist in the database. If not, it returns an appropriate error response.
Verifies if the site contains the specified drone and if the user is assigned to the drone.
If the checks pass, it creates a new mission instance, saves it to the database, and returns a 201 Created response with the created mission object.

filterMission
The filterMission function filters missions based on the provided query parameter. It performs the following steps:

Retrieves the category name from the query parameter.
Finds the category details in the database based on the provided name.
If the category details are not found, it returns a 400 Bad Request response with an appropriate error message.
Queries the Mission model to find all missions that belong to the specified category.
Returns a 200 OK response with an array of the matching missions.

updateMissionUnderSite
The updateMissionUnderSite function updates a mission associated with a specific site. It performs the following steps:

Retrieves the site ID from the URL parameter.
Retrieves the user ID from the request object.
Validates the request body by checking if the required fields (drone, site, and category) are provided.
Retrieves the mission details based on the user ID from the Mission model.
If the mission details are not found, it returns a 404 Not Found response with an appropriate error message.
Retrieves the drone, user, category, and site details from their respective models.
Checks if the user is authorized to update the mission.
If the user is authorized, it updates the mission with the new values and returns a 200 OK response with the updated mission object.

deleteMissionUnderSite
This function deletes a mission associated with a specific site. It verifies if the mission exists for the given user and site and then removes it from the database.

README
This repository contains code for user registration, login, and profile retrieval in a drone management system. The code is written in JavaScript and uses the Express.js framework for building the API endpoints. The following sections provide an overview of the code structure and functionality.

Dependencies
The code relies on the following dependencies, which should be installed prior to running the application:

bcrypt: This package is used for hashing and comparing passwords.
jsonwebtoken: This package is used for generating JWT tokens.
Models
The code includes a model file that defines the data structure for the User entity:

UserModel.js: Defines the schema for a user.
Functions
The code includes the following functions for user management:

registerUser
This function handles user registration. It validates the request body data, checks if the email is already registered, hashes the password using bcrypt, and creates a new user instance. The user is then saved to the database.

loginUser
This function handles user login. It checks if the user exists, compares the provided password with the hashed password stored in the database using bcrypt, and generates a JWT token using jsonwebtoken if the password matches.

getUserProfile
This function retrieves the profile of a specific user. It fetches the user profile from the database based on the provided user ID and returns it as a response. If the user is not found, an appropriate error message is returned.


Create a New Drone
Endpoint: POST /drones

This endpoint allows users to create a new drone by sending a POST request to the /drones route. The request should include the drone details in the request body. The API validates the request body using the express-validator library to ensure the required fields are present and have valid values. If the validation fails, the API returns a 400 Bad Request response with details of the validation errors. If the validation passes, the API creates a new drone instance using the provided data, saves it to the database, and returns a 201 Created response with the created drone data.

Delete a Drone
Endpoint: DELETE /drones/:droneId

This endpoint allows users to delete a specific drone by sending a DELETE request to the /drones/:droneId route, where :droneId is the ID of the drone to be deleted. The API checks if the user exists and is authorized to delete the drone by verifying the user's ID and the drone ID. If the user is not found or unauthorized, the API returns an appropriate error response. If the user is authorized, the API searches for the drone in the database using the provided ID. If the drone is found, it is deleted from the database, and the API returns a 200 OK response with a success message. If the drone is not found, the API returns a 404 Not Found response.


Create a New Site
Endpoint: POST /sites

This endpoint allows users to create a new site by sending a POST request to the /sites route. The request should include the site details in the request body. The API validates the request body using the express-validator library to ensure the required fields are present and have valid values. If the validation fails, the API returns a 400 Bad Request response with details of the validation errors. If the validation passes, the API creates a new site instance using the provided data, saves it to the database, and returns a 201 Created response with the created site data.

Update a Site
Endpoint: PUT /sites/:siteId

This endpoint allows users to update an existing site by sending a PUT request to the /sites/:siteId route, where :siteId is the ID of the site to be updated. The request should include the updated site details in the request body. The API checks if the site exists and belongs to the logged-in user based on the provided site ID and user ID. If the site is not found or does not belong to the user, the API returns an appropriate error response. If the site is found and belongs to the user, the API updates the site with the provided data and returns a 200 OK response with a success message and the updated site data.

Delete Drones under a Site
Endpoint: DELETE /sites/:siteId/drones

This endpoint allows users to delete drones under a specific site by sending a DELETE request to the /sites/:siteId/drones route, where :siteId is the ID of the site. The request should include the drone IDs to be deleted in the request body. The API checks if the site exists and belongs to the logged-in user based on the provided site ID and user ID. If the site is not found or does not belong to the user, the API returns an appropriate error response. If the site is found and belongs to the user, the API removes the specified drones from the site's drone list and returns a 200 OK response with a success message and the updated site data.

Delete a Site
Endpoint: DELETE /sites/:siteId

This endpoint allows users to delete a specific site by sending a DELETE request to the /sites/:siteId route, where :siteId is the ID of the site to be deleted. The API checks if the site exists and belongs to the logged-in user based on the provided site ID and user ID. If the site is not found or does not belong to the user, the API returns an appropriate error response. If the site is found and belongs to the user, the API deletes the site from the database and returns a 200 OK response with a success message.

Create a New Category
Endpoint: POST /categories

This endpoint allows users to create a new category by sending a POST request to the /categories route. The request should include the category details in the request body. The API validates the request body using the express-validator library to ensure the required fields are present and have valid values. If the validation fails, the API returns a 400 Bad Request response with details of the validation errors. If the validation passes, the API creates a new category instance using the provided data, saves it to the database, and returns a 201 Created response with the created category data.

Get All Categories
Endpoint: GET /categories

This endpoint allows users to retrieve all categories by sending a GET request to the /categories route. The API fetches all the categories from the database and returns a JSON response with the category data.

Get a Single Category by ID
Endpoint: GET /categories/:id

This endpoint allows users to retrieve a single category by its ID by sending a GET request to the /categories/:id route, where :id is the ID of the category. The API searches for the category in the database based on the provided ID and returns a JSON response with the category data. If the category is not found, the API returns a 404 Not Found response with an error message.



Create a New Site
Endpoint: POST /sites

This endpoint allows users to create a new site by sending a POST request to the /sites route. The request should include the site details in the request body. The API validates the request body using the express-validator library to ensure the required fields are present and have valid values. If the validation fails, the API returns a 400 Bad Request response with details of the validation errors. If the validation passes, the API creates a new site instance using the provided data, saves it to the database, and returns a 201 Created response with the created site data.

Update a Site
Endpoint: PUT /sites/:siteId

This endpoint allows users to update an existing site by sending a PUT request to the /sites/:siteId route, where :siteId is the ID of the site to be updated. The request should include the updated site details in the request body. The API checks if the site exists and belongs to the logged-in user based on the provided site ID and user ID. If the site is not found or does not belong to the user, the API returns an appropriate error response. If the site is found and belongs to the user, the API updates the site with the provided data and returns a 200 OK response with a success message and the updated site data.

Delete Drones under a Site
Endpoint: DELETE /sites/:siteId/drones

This endpoint allows users to delete drones under a specific site by sending a DELETE request to the /sites/:siteId/drones route, where :siteId is the ID of the site. The request should include the drone IDs to be deleted in the request body. The API checks if the site exists and belongs to the logged-in user based on the provided site ID and user ID. If the site is not found or does not belong to the user, the API returns an appropriate error response. If the site is found and belongs to the user, the API removes the specified drones from the site's drone list and returns a 200 OK response with a success message and the updated site data.

Delete a Site
Endpoint: DELETE /sites/:siteId

This endpoint allows users to delete a specific site by sending a DELETE request to the /sites/:siteId route, where :siteId is the ID of the site to be deleted. The API checks if the site exists and belongs to the logged-in user based on the provided site ID and user ID. If the site is not found or does not belong to the user, the API returns an appropriate error response. If the site is found and belongs to the user, the API deletes the site from the database and returns a 200 OK response with a success message.


Error Handling
The code includes error handling to handle potential errors that may occur during the execution of the functions. If an error occurs, the server responds with an appropriate error message and status code (400, 404, or 500).







