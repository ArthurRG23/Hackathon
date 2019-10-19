"use strict";
//const request = require("request");

//require("dotenv").config();
function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);

  var mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

function enviarImg(imageUrl) {
  const subscriptionKey = "fb96e9ad59654a739c475852ab80e127";

  const params = {
    returnFaceId: "true",
    returnFaceLandmarks: "false",
    returnFaceAttributes: "age"
  };

  const uriBase =
    "https://autentificacaofacial.cognitiveservices.azure.com/face/v1.0/detect?" +
    Object.keys(params)
      .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

  fetch(uriBase, {
    method: "POST",
    body: dataURItoBlob(imageUrl),
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": subscriptionKey
    }
  })
    .then(response => {
      response.json().then(res => {
        console.log(res);
        var resId = res[0].faceId;
        var nomeId = document.getElementById("nomeId").value;
        console.log({ resId, nomeId });
        fetch("http://localhost:3000/usuario", {
          method: "POST",
          body: JSON.stringify({ resId, nomeId }),
          headers: { "Content-Type": "application/json" }
        })
          .then(resposta => {
            console.log(resposta);
          })
          .catch(errr => {
            console.log(errr);
          });
      });
    })
    .catch(err => {
      console.log(err);
    });
}

function reconheceImg(imageUrl) {
  {
    const subscriptionKey = "fb96e9ad59654a739c475852ab80e127";

    const uriBase =
      "https://autentificacaofacial.cognitiveservices.azure.com/face/v1.0/detect?" +
      Object.keys(params)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");

    fetch(uriBase, {
      method: "POST",
      body: dataURItoBlob(imageUrl),
      headers: {
        "Content-Type": "application/octet-stream",
        "Ocp-Apim-Subscription-Key": subscriptionKey
      }
    })
      .then(response => {
        console.log(response);
        var resId = res[0].faceId;
        fetch("http://localhost:3000/usuario/" + resId, {
          method: "GET"
        })
          .then(res => {
            console.log("Reconhecido");
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
