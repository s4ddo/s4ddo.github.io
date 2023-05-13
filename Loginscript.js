var objPeople = [
{
username: "saraii",
password: "ngekekman123456789"   //yousef #1
},
{
username: "dappal",   //daffal #2
password: "duk"
},
{
username: "lolifighter", //mutia #3
password: "flatty"
},
{
username: "ahmad",    //me #4
password: "ayahmama3235"
},
{
username: "butan",  //sultan #5
password: "elwafi"
},
{
username: "abduh28",  //abduh #6
password: "1234567"
},
{
username: "Faizah",  //Faizah #7
password: "idkidc"
},
{
username: "Chrono",  //Hendrick #8
password: "animeforlifeu"
},
{
username: "mary222",  //Maritza #9
password: "dressesed"
},
{
username: "rowan",  //Rowan #10
password: "rowan123"
},
{
username: "Oxygen",  //shadowjake #11
password: "iamnotarobot"
},
{
username: "adibdiw22",  //Rowan #10
password: "dibdiw22"
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
