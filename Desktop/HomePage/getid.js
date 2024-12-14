import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
  import { getDatabase, ref, child, onValue, get, update } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-database.js";
  const firebaseConfig = {
    apiKey: "AIzaSyD9yGArkz7oubGAtVO2FbwThGikxhJY3hw",
    authDomain: "trialproject-9f7bf.firebaseapp.com",
    databaseURL: "https://trialproject-9f7bf-default-rtdb.firebaseio.com",
    projectId: "trialproject-9f7bf",
    storageBucket: "trialproject-9f7bf.appspot.com",
    messagingSenderId: "188371728581",
    appId: "1:188371728581:web:f22681635b4def702098ac",
    measurementId: "G-BCN320ENDH"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

//   function funcall(index, uname, pres) {
//     console.log(1)
//     alert(pres)
//     update(ref(database, "users/" + uname), {
//       present: pres
//     })
//       .then(() => {
//         alert("attendance updated!");
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   }

  var srNo = 0;
  var list = [];

  var tbody = document.getElementById('tbody1')
  function AddItemToTable(username, fn, ln, des, dep) {
    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');
    let td8 = document.createElement('td');

    var present = 0
    var un = "\'" + username + "\'";
    // var un = username
    // alert(un);

    td1.innerHTML = ++srNo;
    td2.innerHTML = username;
    td3.innerHTML = fn;
    td4.innerHTML = ln;
    td5.innerHTML = des;
    td6.innerHTML = dep;
    td7.innerHTML = '<input type="number" name="attendance" id="attendance" style="height: 40px; width: 40px; text-align: center; border-bottom: 1px solid grey; background-color: rgba(241, 241, 241, 0); ">';
    // list.push([username, fn, ln, des, dep])
    td8.innerHTML = '<input type="button" value="Save" name="save" id="save" style="height: 40px; width: 150px; background-color: #00B6FF; float: right; color: #ffffff; font-weight: bold" onclick="getid(' + srNo + ', ' + present + ', ' + un + ', '+database+');"></button>';
    

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);

    // var present = td7.innerHTML.toString();


    tbody.appendChild(trow);
  }



  function AddAllItemsToTable(users) {
    srNo = 0;
    tbody.innerHTML = "";
    users.forEach(element => {
      AddItemToTable(element.username, element.fn, element.ln, element.des, element.dep)
    });
  }


  function GetAllDataRealtime() {
    const dbRef = ref(database, "users");

    onValue(dbRef, (snapshot) => {
      var users = [];

      snapshot.forEach(childSnapshot => {
        users.push(childSnapshot.val());
      });

      AddAllItemsToTable(users);

    })
  }

  window.onload = GetAllDataRealtime;