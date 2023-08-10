
function callbackfn(result){
    console.log(result);
}

fetch("http://localhost:3000/?key=mks", {method: "POST"}).then(callbackfn)