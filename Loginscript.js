var objPeople = [
{
username: "saraii",
password: "ngekekman123456789"   //yousef #1
}
]




function getInfo() {
var username = document.getElementById('username').value
var password = document.getElementById('password').value







for(var i = 0; i < objPeople.length; i++) {
if(username == objPeople[i].username && password == objPeople[i].password) {
   document.location.href = "Home.html";
  return
}
}
document.getElementById("p1").innerHTML = "Incorrect Username/Password";



}
