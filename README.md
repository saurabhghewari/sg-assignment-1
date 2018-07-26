# Assignment#1

### Steps to run this Project.

1. Install Nodejs from https://nodejs.org
2. Clone the repository or download the zip folder to your filesystem.
3. Unzip the zip folder.
4. Open Command Prompt and **cd** into the the folder of the project. 
5. **cd path/to/unzipped/folder**
6. Fire the command node index.js. **For windows users add Node path to sys env**
7. You should see the server running on 5000 and 5001 Ports.

### Test API
1. Install standalone application POSTMAN a **CURL** based UI application.
2. After configuring the api in POSTMAN, click on SEND button in POSTMAN and check the response.
3. API must be **http://localhost:5000/hello** or **https://localhost:5001/hello**
4. You should see, a success JSON response with **message** filed.

### Important Points
1. **https** folder in Project contains the SSL certificate Private and Public Key file.
2. HTTP server is listening on 5000 and HTTPS server on 5001.
3. For Windows users SSL is not tested.
4. To test SSL(https) api using POSTMAN follow the below steps

	* Open **Settings** of Postman which can be found at header top right.
	* In **GENERAL** tab turn off the SSL security.
	* Restart the Postman and test the https api.
