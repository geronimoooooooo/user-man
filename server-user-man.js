const express    = require('express');
const fs         = require('fs');
const path       =  require('path')
const https      = require('https');
const app        = express();
const port       = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World! '+new Date().toUTCString());
});

//#region WEBSERVER
//#region https
// const httpsServer = https.createServer({
//     key: fs.readFileSync('privateKey.key'),
//     cert: fs.readFileSync('certificate.crt'),
//   }, app);

// var privateKey  = fs.readFileSync('sslcert/privateKey.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/certificate.crt', 'utf8');

// var credentials = {key: privateKey, cert: certificate};

/* const credentials = {
    key: fs.readFileSync('sslcert/privateKey.key'),
    cert: fs.readFileSync('sslcert/certificate.crt')
  };
*/
//#endregion

//set NODE_OPTIONS=--openssl-legacy-provider in cmd in VS;read magic wiki
const credentials = {
    pfx: fs.readFileSync(path.join(__dirname,'sslcert', 'STAR_researchstudio_at.pfx'))
  };
  
  const portHTTPS = process.env.PORTHTTPS || 443
  const httpsServer = https.createServer(credentials, app);
  
  // const port = process.env.PORT || 3000
  // app.listen(port, ()=>{
  //   console.log(`browse this url: localhost:${port}`);  
  // });
  
  //443 used: check tomcat http://localhost:8080/ 
  httpsServer.listen(portHTTPS, (err) => {
    if(err){
      console.log("Error: ", err);
      console.log(new Date().toISOString()+` https server could not start on port: ${portHTTPS}`);
    }else{
      console.log(new Date().toISOString()+` https server running on port: ${portHTTPS}`);
      console.log(new Date().toISOString()+` call: https://ispacevm04.researchstudio.at/main`);
    }
  });
  //#endregion