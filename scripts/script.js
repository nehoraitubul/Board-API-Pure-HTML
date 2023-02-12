function updateTextInput(val) {
    document.getElementById("rangeText").innerHTML = val/10
}


window.addEventListener("load", () => {

    var counter = 1
        
    function sendData(formData) {


        fetch('https://www.boredapi.com/api/activity' + '?' + new URLSearchParams(formData.toString()))
            .then((response) => response.json())
                .then((data) => {
                    if ("error" in data) {
                        document.getElementById('alertError').classList.remove('visually-hidden')
                        timerId = setTimeout(
                            () => {
                                document.getElementById('alertError').classList.add('visually-hidden')
                            }, 2 * 1000
                        )
                    } else {
                        const activityTR = document.createElement("tr")
                        const activityTHrow = document.createElement("th")
                        activityTHrow.setAttribute("scope", "row")
                        activityTHrow.innerHTML= counter
                        counter += 1
                        console.log(data);
                        

                        activityTR.appendChild(activityTHrow)
                        activityTR.appendChild(Object.assign(document.createElement('th'),{innerHTML:data.activity}))
                        activityTR.appendChild(Object.assign(document.createElement('th'),{innerHTML:data.participants}))
                        activityTR.appendChild(Object.assign(document.createElement('th'),{innerHTML:data.price}))
                        btn = (Object.assign(document.createElement('button'),{innerHTML:'X'}))
                        // btn.onclick = function(this) {console.log(this);}
                        btn.setAttribute("onclick",'removeItem(this)')
                        btnTR = document.createElement('th').appendChild(btn)
                        activityTR.appendChild(btnTR)

                        const activityList = document.getElementById("activityList")
                        activityList.appendChild(activityTR)

                        document.getElementById('alertSucess').classList.remove('visually-hidden')
                        timerId = setTimeout(
                            () => {
                                document.getElementById('alertSucess').classList.add('visually-hidden')
                            }, 2 * 1000
                        )
                        
                        
                    }

            })
        .catch((error) => {
            document.getElementById('alertError').classList.remove('visually-hidden')
            timerId = setTimeout(
                () => {
                    document.getElementById('alertError').classList.add('visually-hidden')
                }, 2 * 1000
            )
            
        })
        .finally(() => {
            document.getElementById('formBtn').removeAttribute('disabled')
            document.getElementById('loading').classList.add('visually-hidden')
          });
        

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


function removeItem(elem) {
    elem.parentNode.remove()
}