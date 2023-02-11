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
                        activityTHrow.innerHTML= retVal+1



                        const activityList = document.querySelectorAll('.row .col-sm-6 .col-sm-12 .table #activityList')
                        console.log(activityList);
                        activityTR.appendChild(activityTHrow)
                        activityList.appendChild(activityTR)
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

    // prepare ui
    // form.setAttribute('disabled', true)
    document.getElementById('formBtn').setAttribute('disabled', true)
    document.getElementById('loading').classList.remove('visually-hidden')

    sendData(data);
});
});

function tableCounter() {
    retVal = document.querySelectorAll('.row .col-sm-6 .col-sm-12 .table');
    return retVal;
}
