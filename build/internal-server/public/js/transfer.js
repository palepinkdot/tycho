"use strict";const submitBtn=document.querySelector("#submit"),fileInput=document.querySelector("#file"),fileOutput=document.querySelector("#fileoutput");fileInput?.addEventListener("change",(()=>{const e=new FileReader;e.addEventListener("load",(()=>{const t=e.result;fileOutput&&(fileOutput.value=t),submitBtn&&(submitBtn.disabled=!1)})),e.readAsText(fileInput.files[0])}));