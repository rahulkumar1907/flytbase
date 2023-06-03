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

Error Handling
The code includes error handling to handle potential errors that may occur during the execution of the functions. If an error occurs, the server responds with an appropriate error message and status code (400, 404, or 500).







