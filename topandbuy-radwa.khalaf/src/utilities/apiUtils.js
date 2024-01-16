export  async function apiCall(API, sendUserData, onSuccess, onError) {
    await fetch(API, {
        method: "POST", 
        headers : {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(sendUserData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === 0) {
          console.log(`Error ${data.status}: ${data.message}`);
          onError(data.message);
        } else {
            console.log(data);
            console.log("success")
            onSuccess({data});
        }
      })
     .catch(error => {
        console.error("Request error:", error);
      });  
}



export function fetchData(API, onSuccess, onError) {
    fetch(API)
    .then(res => res.json())
    .then(data => onSuccess(data))
    .catch(error => {
        console.error("Request error:", error);
        onError(error);
    });
}
