function updateTextInput(val) {
    document.getElementById("rangeText").innerHTML = val/10
}


window.addEventListener("load", () => {
        
    function sendData(formData) {


        fetch('https://www.boredapi.com/api/activity' + '?' + new URLSearchParams(formData.toString()))
            .then((response) => response.json())
                .then((data) => {
                    if ("error" in data) {
                        console.log('error');
                    } else {
                        retVal = tableCounter()
                        const activityTR = document.createElement("tr")
                        const activityTHrow = document.createElement("th")
                        activityTHrow.setAttribute("scope", "row")
                        activityTHrow.innerHTML= retVal
                        console.log(data);
                        

                        activityTR.appendChild(activityTHrow)
                        activityTR.appendChild(Object.assign(document.createElement('th'),{innerHTML:data.activity}))
                        activityTR.appendChild(Object.assign(document.createElement('th'),{innerHTML:data.type}))
                        activityTR.appendChild(Object.assign(document.createElement('th'),{innerHTML:data.participants}))
                        activityTR.appendChild(Object.assign(document.createElement('th'),{innerHTML:data.price}))

                        const activityList = document.querySelector('.row .col-sm-6 .col-sm-12 .table #activityList')
                        activityList.appendChild(activityTR)



                        document.getElementById('formBtn').removeAttribute('disabled')
                        document.getElementById('loading').classList.add('visually-hidden')
                    }
                    // console.log("SUCCESS")
                    // document.getElementById('formBtn').removeAttribute('disabled')
                    // document.getElementById('loading').classList.add('visually-hidden')
                    // console.log(data)
            })
        .catch((error) => console.log(error))
}

// Get the form element
const form = document.getElementById("board-apiForm");

// Add 'submit' event handler
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = [...formData.entries()];
    const dataAsString = data.map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`).join('&');
    console.log(('https://www.boredapi.com/api/activity' + '?' + new URLSearchParams(formData.toString())));


    document.getElementById('formBtn').setAttribute('disabled', true)
    document.getElementById('loading').classList.remove('visually-hidden')


    sendData(data);
});
});

function tableCounter() {
    retVal = document.querySelectorAll('.row .col-sm-6 .col-sm-12 .table #activityList');
    console.log(retVal);
    return retVal.length
    ;
}
