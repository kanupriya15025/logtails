



To Run this without docker : 

1. Create and export a environment variable called folder
  folder=<path to the log directory>
  export folder
2. Then run the app.js
  node app.js

3. To access the webapp, navigate to http://<IP-of-host-machine>:3000/tails



To run the docker version :

1. Pull the image : 
  sudo docker pull kanu15025/log-scroll-final:v5
2. Run the image :
  sudo docker run -it -v <hostfolder>:<mount-folder-on-container> -p 3000:3000 -e folder=<mount-folder-on- container> kanu15025/log-scroll-final:v5