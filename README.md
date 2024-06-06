# Overview
There is a wide array of solutions to assist in a beehive’s overall health; however, many solutions are impractical due to the expense or lack of efficiency. We intend to remedy most of these issues, as we aim to be a small compact system placed near the entrance of the hive. With the camera being one of the main components, the overall expense of adding more systems is much cheaper compared to other potential solutions, as a customer would only need to purchase another camera, solar panel, and battery. This camera would be able to count the number of bees entering and exiting the hive using an energy-efficient and reliable communication system. The data collected from the camera will be sent over the cloud to the managing Raspberry Pi and the database. The data can be easily accessed through the web application. We will leverage data analytics to evaluate how many bees are present in the hive during the day and track the population of the hive over a period of time. 
This project utilizes an ESP32 camera module, Raspberry Pi, and a React web application each using C++, Python, and JavaScript respectively. See slides for more detail.
## Navigation
To navigate to source code, select the frontend directory to view the frontend code for the project, the backend directory to view the backend code for the project, the machine learning directory to view the machine learning model, and ESP-32-camera-webserver to view the code for initializing the server. For ESP-32-camera-webserver directory, navigate to the .ino file to initialize the server.
## How-To Guide
ESP-32-camera-webserver is an adapted version of user easytarget’s [ESP-32-camera-webserver](https://github.com/easytarget/esp32-cam-webserver) and extends the same rights that it does. For OTA capabilities, user wjsanek’s [Working_ESP32_CAM_BEST_DOES_EVERYTHING_V10]( https://github.com/wjsanek/wjsanek) was adapted.

## ESP32 Camera
1. Make sure your computer has COM capabilities
2. Plug the ESP32 camera into the computer using USB-A/USB-C to Micro USB
3. Change the board module to ESP32 Dev Module
4. Add your SSID and password to the station_list found in myconfig.h
5. Change the board manager to ESP32 Dev Module. 
- If package is not installed, follow these instructions to set up the [package]( https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html)
6. Under the Tools section:  
- The selected COM port is connected to the camera
- CPU Frequency to 240MHz (WiFi/BT)
- Flash Frequency to 80 MHz
- Flash mode to QIO
- Flash size to 4 MB
- Partition Scheme to Minimal SPIFFS (1.9 MB APP with OTA/190 KB SPIFFS)
- PSRAM to Enabled
- Upload Speed to 921600
7. Upload the ESP-32-camera-webserver sketch (.ino file) to the ESP32 camera
Optional: Modify myconfig.h to add additional networks and adjust camera settings

## Raspberry Pi

1. Flash the Raspberry Pi SD card with the [OS](https://www.raspberrypi.com/software/) of your choice
2. Plug the Raspberry Pi into an outlet using USB-C cable
3. Set up default user and permissions
4. Open a terminal and create a folder for the project
5. In order to use the Watchdog scripts found on the Raspberry Pi, follow these steps:
- Locate the proper directory by typing the following command into a terminal: cd /SDScripts
- Enter the python virtual environment by entering the command: source /home/<user_name>/python_env/bin/activate
- Enter the command: python sender_watchdog.py, in order to manually run the script.
6. In order to modify the cron log, follow these instructions:
- Open a terminal and enter the command: sudo root, to become a root user. 
- Enter the command: crontab -e
- The command will prompt a new terminal where you can edit any cron jobs. At the time of this ReadMe, we only have one cron job that runs the watchdog script at boot. 



## Heroku 
1. Sign into [Heroku](www.heroku.com) using your user account information.
2. Select the hiv3-app, once you’ve selected the hiv3-app, you will be directed to the Heroku portal.
3. To deploy a new build, follow these next steps. 
- Select the “deploy” tab.
- Make sure your deployment method is: Github
- Scroll down to “Manual Deploy”, and select the branch you wish to deploy. 
- Click “Deploy Branch”
4. To add new users to the heroku app, follow these steps. 
- Select the “activity” tab 
- Select “Add Collaborator”
- Input user’s email address
- Select “Save Changes”
5. To connect other platforms to Heroku
- Used to connect MongoDB to Heroku
- Select the “settings” tab
- Scroll down to “config vars”
- Click “Reveal Config Vars”
- Input the appropriate name and key values for the associated platform
- Click “Add”

## MongoDB
1. Sign into [MongoDB](www.mongodb.com) using your user account information.
2. You will be directed to the Atlas Portal. Click “Browse Collections” to view all data sets. 
3. To create a new collection, follow these next steps.
- Hover your mouse over an existing database: “HIV3_DB”. 
- Click the “+” icon
- Input name and type of collection you wish to add. 
- Click “Create”
4. To remove a new collection, follow these steps.
- Hover your mouse over an existing collection.
- Click the trash icon
- Enter the name of the collection
- Click “Drop”
5. To add a user to the database, follow these steps.
- Look for an icon depicting a user with a + sign at the top right of the page.
- Select the icon
- Enter the email address of the user
- Click “Invite to Project”

## Web Application
1. Make sure to have the github repository saved locally. We used Visual Studio Code for the web application.
2. To access the web application locally, follow these steps.
- Access the backend folder: cd /backend
- Run command: npm install. In order to get the needed packages. 
- Run command: npm start.
- Switch to the frontend directory: cd /frontend
- Run command: npm install. In order to get the needed packages.
- Run command npm start.
3. To upload the code to Heroku, follow these steps.
- In your local save of the github repository, delete the current build folder.
- Switch to the frontend directory: cd /frontend.
- Run the command: npm run build.
- Once the build is finished compiling, move the build folder from the frontend directory to the directory preceding the frontend directory. 
- The build folder should be on the same level as both the backend and frontend folder. 
- Go to the Heroku section to understand how to deploy a new build. 

## Machine Learning
1. To work on the machine learning portion, make sure that you download the dataset and use that to test and train your model. Unzip the ultralytics package and install it to your libraries. 
2. In order to train and test the model, use the TrainingModel.ipynb to train the model and to test it on test images and videos. 
3. To change the backbone or the loss function, edit the Ultralytics library.
4. If you have questions about YOLOv8, plesae refer to their [documentation](https://docs.ultralytics.com) 

## Cloning Project from GitHub
1. Select the Code button in green at the top of the repository and download the .zip file
2. Follow the instructions in How-To Guide for installation process
