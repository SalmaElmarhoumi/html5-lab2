//geoLocation


let watchId;

        function startWatching() {
            if (navigator.geolocation) {
                // Watch the user's position
                watchId = navigator.geolocation.watchPosition(showPosition, showError);
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        }


        function showPosition(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
        
            const smallWindow = document.getElementById('smallWindow');
            smallWindow.innerHTML = `<iframe width="300" height="300" top="10px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps?q=${latitude},${longitude}&output=embed"></iframe>`;
            smallWindow.style.display = 'block';
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert('User denied the request for Geolocation.');
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert('Location information is unavailable.');
                    break;
                case error.TIMEOUT:
                    alert('The request to get user location timed out.');
                    break;
                case error.UNKNOWN_ERROR:
                    alert('An unknown error occurred.');
                    break;
            }
        }

        function stopWatching() {
            // Clear the watch position
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }

            // Hide the small window
            document.getElementById('smallWindow').style.display = 'none';

            // Clear the map
            document.getElementById('map').innerHTML = '';
        }
        // form

        function addUser() {
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;

            // Retrieve existing users from local storage or initialize an empty array
            var users = JSON.parse(localStorage.getItem('users')) || [];

            // Add the new user to the array
            users.push({ name: name, email: email });

            // Save the updated array back to local storage
            localStorage.setItem('users', JSON.stringify(users));

            // Refresh the table
            displayUsers();
        }

        function displayUsers() {
            var usersTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
            usersTable.innerHTML = '';

            var users = JSON.parse(localStorage.getItem('users')) || [];

            for (var i = 0; i < users.length; i++) {
                var row = usersTable.insertRow(i);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);

                cell1.innerHTML = users[i].name;
                cell2.innerHTML = users[i].email;
                cell3.innerHTML = '<button onclick="deleteUser(' + i + ')">Delete</button>';
            }
        }

        function deleteUser(index) {
            var users = JSON.parse(localStorage.getItem('users')) || [];

            // Remove the user at the specified index
            users.splice(index, 1);

            // Save the updated array back to local storage
            localStorage.setItem('users', JSON.stringify(users));

            // Refresh the table
            displayUsers();
        }

        function removeAllUsers() {
            // Remove all users from local storage
            localStorage.removeItem('users');

            // Refresh the table
            displayUsers();
        }

        // Display users on page load
        displayUsers();


        //webwork

//         //first worker
//         const worker1 = new Worker('worker1.js');

//         //second worker
//         const worker2 = new Worker('worker2.js');

//         // Handle messages from worker1
//         worker1.onmessage = function(event) {
//             console.log('Message from Worker 1:', event.data);

//             // Send a message to worker2
//             worker2.postMessage('Hello from Main Script to Worker 2!');
//         };

//         // Handle messages from worker2
//         worker2.onmessage = function(event) {
//             console.log('Message from Worker 2:', event.data);
//         };

//         // Send a message to worker1
//         worker1.postMessage('Hello from Main Script to Worker 1!');
        

//         // Worker 1

// // Handle messages from the main script
// onmessage = function(event) {
//     console.log('Message from Main Script to Worker 1:', event.data);

//     // Send a message back to the main script
//     postMessage('Hello from Worker 1!');
// };


// // Worker 2

// // Handle messages from the main script
// onmessage = function(event) {
//     console.log('Message from Main Script to Worker 2:', event.data);

//     // Send a message back to the main script
//     postMessage('Hello from Worker 2!');
// };


let worker1 = new Worker("worker1.js");
let sum = document.getElementById("sum");
let bg = document.getElementById("change-bg");
let worker2 = new Worker("worker2.js");
let num = document.getElementById("webworker2");

sum.onclick = function (){
    worker1.postMessage("");
}

worker1.onmessage = function (message) {
    alert(message.data);
}

bg.onclick = function () {
    document.body.style.background = (document.body.style.background === 'wheat') ? 'pink' : 'wheat';
}

num.onclick = function () {
    worker2.postMessage("");
}

worker2.onmessage = function (message) {
    alert(message.data);
}


        