// var logBtn= document.getElementById("loginBtn");
var user=document.getElementById("Name");
var user_id="";
var friends=document.getElementById("Friends");
entrance=document.getElementById("Enter");
entrance.style.visibility="hidden";

var fr=document.getElementById("fr");



VK.Auth.getLoginStatus(function (response) {
    var resp=JSON.parse(JSON.stringify(response));
    if (resp.status=="unknown" || resp.status=="not_authorized") {
        entrance.style.visibility = "visible";
    }
    entrance.onclick=function() {
        VK.Auth.login(function (response) {
            var res = JSON.parse(JSON.stringify(response));

            VK.Auth.getLoginStatus(function (perm) {
                var per=JSON.parse(JSON.stringify(perm));
                if (per.status=="connected")
                {
                    entrance.style.visibility = "hidden";
                    fr.style.visibility="visible";


                    user.innerHTML = res['session']['user']['first_name'] + " " + res['session']['user']['last_name'];
                    user_id = res['session']['user']['id'];


                    VK.Api.call('friends.get', {user_ids: user_id, fields: ["first_name", "last_name"], v: "5.73"}, function (response) {

                         var users = JSON.parse(JSON.stringify(response["response"]["items"]));
                         var n = 5;
                         if (users.length < 5)
                             n = users.length;
                         for (var i = 0; i < n; i++) {
                             friends.innerHTML+=users[i].first_name+" "+users[i].last_name+"<br>";
                         }


                    });

                }
            })



        }, VK.access.FRIENDS);
    }
    if (resp.status=="connected") {
        entrance.click();
    }


})







