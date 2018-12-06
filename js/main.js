// var logBtn= document.getElementById("loginBtn");
var user=document.getElementById("Name");
var user_id="";
var friends=document.getElementById("Friends");
entrance=document.getElementById("Enter");
entrance.style.visibility="hidden";
var us=document.getElementById("us");
var fr=document.getElementById("fr");
//fr.style.visibility="hidden";
//us.style.visibility="hidden";


VK.Auth.getLoginStatus(function (response) {
    var resp=JSON.parse(JSON.stringify(response));
    if (resp.status=="unknown" || resp.status=="not_authorized") {
        entrance.style.visibility = "visible";
    }
    entrance.onclick=function() {
        VK.Auth.login(function (response) {
            var res = JSON.parse(JSON.stringify(response));
            entrance.style.visibility = "hidden";
            fr.style.visibility="visible";
            us.style.visibility="visible";

            user.innerHTML = res['session']['user']['first_name'] + " " + res['session']['user']['last_name'];
            user_id = res['session']['user']['id'];


            VK.Api.call('friends.get', {user_ids: user_id, v: "5.73"}, function (response) {

                var users = JSON.parse(JSON.stringify(response["response"]["items"]));
                var n = 5;
                if (users.length < 5)
                    n = users.length;
                for (var i = 0; i < n; i++) {
                    VK.Api.call('users.get', {user_ids: users[i], v: "5.73"}, function (resp) {
                        var friend = JSON.parse(JSON.stringify(resp))["response"][0];
                        friends.innerHTML += friend["first_name"] + " " + friend["last_name"] + "<br/>"
                        console.log();
                    })
                }

            });


            //console.log(VK.Friend.get());
        }, VK.access.FRIENDS);
    }
    if (resp.status=="connected") {
        entrance.click();
    }


})







