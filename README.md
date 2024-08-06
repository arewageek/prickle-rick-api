# prickle-rick-api

Functionalities for the api

**User Endpoints**

- **GET /user/:id**

  - Description: Retrieves user data based on the provided user ID in the URL path parameter.
  - Request Parameters:
    - telegramId (required, number): The Telegram user ID of the user.
  - Response:
    - status (number): HTTP Status code indicating the outcome of the request.
      - 200: Successr
      - 404: User not found
      - 500: Internal server error
    - message (string, optional): An optional message indicating the cause of the error (if applicable).
    - data (object, optional): User data if successful.

- **GET /user/:id/referrals**

  - Description: Retrieves referral data for the user specified by the ID in the URL path parameter.
  - Request Parameters:
    - telegramId (required, number): The Telegram user ID of the user.
  - Response:
    - status (number): HTTP Status code indicating the outcome of the request.
      - 200: Success
      - 404: User not found or no referrals found
      - 500: Internal server error
    - referralsCount (number): The total number of referrals the user has.
    - referrals (array of objects, optional): An array of user objects representing the user's referrals.

- **POST /user/create**
  - Description: Creates a new user account.
  - Request Body:
    - tgId (required, number): The Telegram user ID of the new user.
    - referredBy (optional, string): The referral code of the user who referred this new user (defaults to "admin").
  - Response:
    - status (number): HTTP Status code indicating the outcome of the request.
      - 201: User created successfully
      - 400: Account already exists
      - 500: Internal server error
    - message (string): A message indicating the result of the request ("success", "accountExist", or "unknownError").

**Task Endpoints**

- **GET /tasks**

  - Description: Retrieves all available tasks and the user's completion status for each task.
  - Request Body:
    - telegramId (optional, number): The Telegram user ID of the requesting user (to check completion status).
  - Response:
    - status (number): HTTP Status code indicating the outcome of the request.
      - 200: Success
      - 500: Internal server error
    - all (array of objects): An array of task objects representing all available tasks.
      - \_id (string): The unique identifier of the task. (This might be private information you don't want to expose in the API)
      - title (string): The title of the task.
      - description (string): The description of the task.
      - image (string, optional): The image URL associated with the task (if any).
      - sponsor (string, optional): The sponsor of the task (if any).
      - reward (number): The reward offered for completing the task.
      - url (string, optional): A URL associated with the task (if any).
      - valid (boolean): A flag indicating if the task is currently active.
    - taskCompletion (array of objects, optional): An array of objects representing the requesting user's completion status for each task (if telegramId was provided).
      - taskId (string): The ID of the completed task.
      - (other fields might depend on your implementation)

- **POST /tasks/:id**

  - Description: Retrieves details for a specific task.
  - Request Parameters:
    - id (required, string): The unique identifier of the task.
  - Response:
    - status (number): HTTP Status code indicating the outcome of the request.
      - 200: Success
      - 404: Task not found
      - 500: Internal server error
    - data (object): The details of the requested task.
      - status (string): The completion status of the task ("completed" or "pending").
      - task (object): The task object containing the same properties as in the /tasks endpoint response.

- **POST /task/:id/edit**
  - Description: Edits the details of a specific task. (This functionality might be restricted based on your project's logic)
  - Request Parameters:
