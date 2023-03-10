
document.getElementById("btnRemove")
.addEventListener("click" , ( )=> {
    // const name = document.getElementById("name").value;
    // const age = document.getElementById("age").value;
    const id = document.getElementById("id").value;
    fetch("http://localhost:8080/delete",{
        headers:{
            'Content-type' : "application/json"
        },
        method : "DELETE",
        body : JSON.stringify({ id:id})
    
    })
    .then(response => response.json())
    .then(data => {
        alert(data.success)
    });
});




document.getElementById("btnPatch")
.addEventListener("click" , ( )=> {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const id = document.getElementById("id").value;
    fetch("http://localhost:8080/patch",{
        headers:{
            'Content-type' : "application/json"
        },
        method : "PATCH",
        body : JSON.stringify({ id:id, name : name, age : age})
    
    })
    .then(response => response.json())
    .then(data => {
        alert(data.success)
        // console.log("data : " , data);
    });

    // console.log("index.html loaded");

});

document.getElementById("btnInsert")
.addEventListener("click" , ( )=> {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    fetch("http://localhost:8080/add",{
        headers:{
            'Content-type' : "application/json"
        },
        method : "POST",
        body : JSON.stringify({ name : name, age : age})
    
    });
    // .then(response => response.json())
    // .then(data => {
    //     console.log("data : " , data);
    // });

    // console.log("index.html loaded");

});
///////////////////////////////////////////////////
const btn = document.getElementById("btn");
btn.addEventListener("click" , ( )=> {
    fetch("http://localhost:8080/home")
    .then(response => response.json())
    .then(data => {
        const div = document.getElementById("msg");
        div.innerHTML = `<h1>${data.message}</h1>`
        console.log("data : " , data);
    });

    // console.log("index.html loaded");

});

const btnList = document.getElementById("usersBtn");
btnList.addEventListener("click" , ( )=> {
    fetch("http://localhost:8080/users")
    .then(response => response.json())
    .then(data => {
        const div = document.getElementById("usersListDiv");
        div.innerHTML = `<h1>${data.details}</h1>`;

        const div2 = document.getElementById("usersListDiv2");
        let txt = "<table>";
        txt += "<th>";
        txt += "<tr>";
        txt += "<td>ID</td>";
        txt += "<td>name</td>";
        txt += "<td>age</td>";
        txt += "</tr>";
        txt += "</th>";
            for (let i = 0; i < data.data.length; i++) {
                txt += `<tr>`;
                txt += `<td>${data.data[i].id}</td>`;
                txt += `<td>${data.data[i].name}</td>`;
                txt += `<td>${data.data[i].age}</td>`;
                txt += `</tr>`;
            }
        txt += "</table>"    
        div2.innerHTML = txt;
        
        console.log("data : " , data.data);
    });

    // console.log("index.html loaded");

});