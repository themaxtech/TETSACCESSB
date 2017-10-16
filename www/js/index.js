
var arung1 = '';
var arung2 = '';
var arung3 = '';
var arung4 = '';
var arung5 = '';
var arung6 = '';
var arung7 = ''; 
var arung111 = '';
var arung222 = '';
var newarun = ''; 
var schoolcode = '';

var userHandler = {
    username    : arung1, 
    userpass    : arung3,
    userclass   : arung4,
    usersec     : arung5,
    useroriname : arung6,
    status      : arung2,
    appid       : arung7,
    gcmid       : arung111,
    wpnid       : arung222,
    schoolcode  : schoolcode
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        if (parseFloat(window.device.version) >= 7.0) {
          document.body.style.marginTop = "20px";
          
        }
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) { 
         
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        //var mail =  window.GoogleAuth.getMailIds();
        userHandler.appid = result;    
        userHandler.wpnid =  result.uri;
        $.jStorage.set("appid", userHandler.appid);
        $.jStorage.set("wpnid", userHandler.wpnid); 

        //alert('Connected to Server! ID:'+ result);
        //alert('Connected to Server! ID:'+ result.uri);

    },
    errorHandler:function(error) {
        //alert(error);
        alert('Error connecting to Server!');

    },
    onNotificationGCM: function(e) {
         
    },
    onNotificationAPN: function(event) {
       
    } ,
    onNotificationWP8: function(e) {
       
    }
    
}; 
$(document).on('pagecontainershow', function (e, ui) {
    var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    if(activePage.attr('id') === 'login') { 
        $(document).on('click', '#submit', function() { // catch the form's submit event
            if($('#username').val().length > 0 && $('#password').val().length > 0 && $('#schoolcode').val().length > 0){  
                var schcode = document.getElementById("schoolcode").value;
                var schuser = document.getElementById("username").value;
                //userHandler.username = $('#username').val();
                //$.jStorage.set("username", userHandler.username);
                arung7   = $.jStorage.get("appid");
                arung111 = $.jStorage.get("gcmid");
                arung222 = $.jStorage.get("wpnid");
                newarun =  encodeURIComponent($.jStorage.get("wpnid"));
                userHandler.appid = $.jStorage.get("appid"); 
                userHandler.gcmid = $.jStorage.get("gcmid"); 
                userHandler.wpnid = $.jStorage.get("wpnid"); 
                    //Send data to server through the Ajax call
                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/login_2.php',
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/login.php',
                    data: {action : 'authorization', deviceid: userHandler.appid, gcmid: userHandler.gcmid, formData : $('#check-user').serialize()},
                    type: 'post',
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.jStorage.set("mykey", userHandler.status); 
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful
                       if(result.status == 'success') {
                            
                            userHandler.username = schuser;
                            userHandler.status = result.status;
                            userHandler.userpass = result.status1;
                            userHandler.userclass = result.status2;
                            userHandler.usersec = result.status3; 
                            userHandler.useroriname = result.status4; 
                            userHandler.schoolcode = schcode;
                            
                            $.jStorage.set("username", userHandler.username);
                            $.jStorage.set("status", result.status);
                            $.jStorage.set("userpass", result.status1);
                            $.jStorage.set("userclass", result.status2);
                            $.jStorage.set("usersec", result.status3);
                            $.jStorage.set("useroriname", result.status4); 
                            $.jStorage.set("mykey", userHandler.status);
                            $.jStorage.set("schoolcode", userHandler.schoolcode); 
                            
                            //$.mobile.changePage("#second");
                            $(document).on("pagebeforeshow","#arunhome",function(event){
                                //alert("pagebeforeshow event fired - pagetwo is about to be shown");
                                //document.getElementById("username").value= userHandler.username;
                                //document.getElementById("username").value= userHandler.username;
                            });
                            $.mobile.changePage("#arunhome"); 
                           
                            //document.getElementById("username").value= userHandler.username;
                            
                        } else {
                            alert('Login Failed!');
                        } 
                        
                    },
                    error: function (request,error) {
                       
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error try again!');
                         
                        
                    }
                });          
                } else {
            //} 
            //if($('#username').val().length === 0 || $('#password').val().length === 0) {
                alert('Please fill all necessary fields');
               // e.preventDefault();
                } 
           
            return false; // cancel original event to prevent form submitting
        });  
    } else if(activePage.attr('id') === 'homepage') {
         
            // ---Logout button click event--- // 
            $(document).on('click', '#logoutsubmit', function() { // catch the form's submit event
            //alert("am clicked");
            //$.jStorage.deleteKey("mykey");

            $.jStorage.flush();
            localStorage.clear();
            userHandler.status = '';
            $.mobile.changePage("#login", {transition : "none" });
            return false; // cancel original event to prevent form submitting
        });

        } else if(activePage.attr('id') === 'arunhome') {
       // activePage.find('.ui-content').text('Wellcome ' + userHandler.username + ' ---   upass= ' + userHandler.userpass + 
       //     ' ---   uclass= ' + userHandler.userclass + ' ---   usec= ' +  userHandler.usersec ); 
       

        // ---Year Calendar button click event--- //
           

            $(document).on('click', '#submit', function() { // catch the form's submit event
            if($('#usernamea').val().length > 0 && $('#passworda').val().length > 0){
              
                // Send data to server through the Ajax call
                // action is functionality we want to call and outputJSON is our data
                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/yearcal.php',
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/yearcal.php',
                    data: {action : 'authorization', formData : $('#check-cal').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') {  
                
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +
                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                            " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2>Year Calendar</h2> " +  
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div>  " +
                        " </div>" +   
                        "<div data-role='content'>" + 
                        "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "  </p>"+
                        "</div></div>";
                          $.mobile.activePage.after(stud_prof);
                        //$.mobile.changePage("#year_calendar"); 
                        $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
                         function myFunction() { 
         
                            var newHTML = [];
                            
                            newHTML.push("<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable'  style='width:100%;background-color:#F7F9FA;'>" + 
                              "<thead><tr style='background-color:#F7AB48;'>" + 
                                  "<th>Date</th>" + 
                                  "<th>Description</th></tr>" + 
                              "</thead>" + 
                              "<tbody>");

                             $.each(result.posts, function( i, val ) { 
                                    output ="<tr><td>" +   
                                            result.posts[i].status2  + " </td><td>" + 
                                            result.posts[i].status1 + "</td></tr>";
                                    //console.log(output); 
                                    newHTML.push(output); 
                                     
                            }); 
                            
                            newHTML.push("</tbody></table>");   
                            okfine = $(".ui-content").html(newHTML.join("")); 
                            return okfine;  
                        }

                        $("#myTable", $.mobile.activePage).val(myFunction());
                         
                        } else {
                                alert('Year Calendar Not Found!');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });                  
            } else {
                alert('Please check username, password fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });

        // ---Message button click event--- //

        $(document).on('click', '#homesubmit', function() { // catch the form's submit event

            if($('#usernameb').val().length > 0 && $('#passwordb').val().length > 0){
                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/inbox.php',
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/inbox.php',
                    data: {action : 'authorization', formData : $('#check-mess').serialize()},
                    type: 'post',
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') {  
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +
                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                        
                            " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2>Message</h2> " +  
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div>  " +
                        " </div>" +   
                        "<div data-role='content'>" + 
                        "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "  </p>"+
                        "</div></div>";
                        $.mobile.activePage.after(stud_prof);
                        //$.mobile.changePage("#year_calendar");
                        $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
                        function myFunction2() { 
         
                            var newHTMLA = []; 
                             
                             $.each(result.posts, function( i, val ) { 
                                    output ="<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>"+
                                    "<thead><th style='background-color:#F7AB48;'><b>"+ result.posts[i].status1  +"</b></th></thead><tbody><tr><td style='text-align:justify;'>" + 
                                    result.posts[i].status3 + "</td><tr></tbody></table><br>";
                                    //console.log(output); 
                                    newHTMLA.push(output); 
                                     
                            }); 
                            
                            //newHTMLA.push("</tbody></table>");   
                            okfine = $(".ui-content").html(newHTMLA.join("")); 
                            return okfine;
                        }
                        $("#myTable2", $.mobile.activePage).val(myFunction2());
                        //$.mobile.pageContainer.pagecontainer("change", "#year_calendar", { options });
                         //console.log($('.ui-page-active').attr('id')); 
                         //console.log('ARUN Log'); 
                        } else {
                                alert('No Message!');
                        }
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });  

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });
        
        // ---Health Card button click event--- //

        $(document).on('click', '#health', function() { // catch the form's submit event

            if($('#usernameo').val().length > 0 && $('#passwordo').val().length > 0){
                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/health.php', 
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/health.php',
                    data: {action : 'authorization', formData : $('#check-leavelist').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') { 
                     
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +
                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                        
                            " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2> Health Card</h2> " +  
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div>  " +
                        " </div>" +   
                        "<div data-role='content'>" + 
                        "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "  </p>"+
                        "</div></div>";
                        $.mobile.activePage.after(stud_prof);
                        //$.mobile.changePage("#year_calendar");
                        $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
                        function myFunction2() { 
         
                            var newHTMLA = [];
                            
                             
                             $.each(result.posts, function( i, val ) { 
                                    output ="<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>"+
                                    "<thead><th colspan='2' style='background-color:#F7AB48;'><b> Health Report</b></th></thead>" +
                                    "<tbody>"+   
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b1 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a1 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b2 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a2 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b3 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a3 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b4 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a4 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b5 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a5 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b6 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a6 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b7 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a7 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b8 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a8 + " </td><tr>" + 

                                    "</tbody></table><br>";
                                    //console.log(output); 
                                    newHTMLA.push(output); 
                                     
                            }); 
                            
                            //newHTMLA.push("</tbody></table>");   
                            okfine = $(".ui-content").html(newHTMLA.join("")); 
                            return okfine;  
                        }
                        $("#myTable2", $.mobile.activePage).val(myFunction2());
                        //$.mobile.pageContainer.pagecontainer("change", "#year_calendar", { options });


                         //console.log($('.ui-page-active').attr('id')); 
                         //console.log('ARUN Log'); 
                        
                        
                         
                        } else {
                                alert('Health Report Not Generated!');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });  

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });
        
         // ---Attendance Card button click event--- //

        $(document).on('click', '#attendance', function() { // catch the form's submit event

            if($('#usernameo').val().length > 0 && $('#passwordo').val().length > 0){
                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/attendance.php', 
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/attendance.php',
                    data: {action : 'authorization', formData : $('#check-leavelist').serialize()},
                    type: 'post', 
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') { 
                     
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +
                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                        
                            " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2> Attendance Report </h2> " +  
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div>  " +
                        " </div>" +   
                        "<div data-role='content'>" + 
                        "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "  </p>"+
                        "</div></div>";
                        $.mobile.activePage.after(stud_prof);
                        //$.mobile.changePage("#year_calendar");
                        $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
                        function myFun() {  
                            var newHTMLA = []; 
                             $.each(result.posts, function( i, val ) { 
                                    output ="<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>"+
                                    "<tbody>"+
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b1 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a1 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b2 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a2 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b3 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a3 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b4 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a4 + " </td><tr>" +  
                                    "</tbody></table><br>";
                                    //console.log(output); 
                                    newHTMLA.push(output); 
                                     
                            }); 
                            
                            //newHTMLA.push("</tbody></table>");   
                            okfine = $(".ui-content").html(newHTMLA.join("")); 
                            return okfine;  
                        }
                        function myFunction2() { 
         
                            var newHTMLA = [];
                             
                             $.each(result.posts, function( i, val ) { 
                                    output ="<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>"+
                                    "<tbody>"+
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b1 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a1 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b2 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a2 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b3 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a3 + " </td><tr>" + 
                                    "<tr><td style='text-align:left;background-color:#90C3D4;'>" + result.posts[i].b4 + "</td> " +
                                    "<td style='text-align:left;'> " + result.posts[i].a4 + " </td><tr>" +  
                                    "</tbody></table><br>";
                                    //console.log(output); 
                                    newHTMLA.push(output); 
                                     
                            }); 
                            
                            //newHTMLA.push("</tbody></table>");   
                            okfine = $(".ui-content").html(newHTMLA.join("")); 
                            return okfine;  
                        }
                        $("#myTable2", $.mobile.activePage).val(myFunction2());
                        //$.mobile.pageContainer.pagecontainer("change", "#year_calendar", { options });


                         //console.log($('.ui-page-active').attr('id')); 
                         //console.log('ARUN Log'); 
                        
                        
                         
                        } else {
                                alert('Attendance Report Not Generated!');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });  

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });
        
        // ---Profile button click event--- //

            $(document).on('click', '#prosubmit', function() { // catch the form's submit event

            if($('#usernamec').val().length > 0 && $('#passwordc').val().length > 0){
                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/pro.php', 
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/pro.php',
                    data: {action : 'authorization', formData : $('#check-pro').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') {   
                
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +
                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                           " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2>Profile</h2> " +  
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div>  " +
                        " </div>" +   
                        "<div data-role='content'>" + 
                       "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "  </p>"+
                        "</div></div>";
                        $.mobile.activePage.after(stud_prof);
                        //$.mobile.changePage("#year_calendar"); 
                        $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );

                         function myFunctiond() {  
                            var newHTMLD = []; 
                             $.each(result.posts, function( i, val ) { 
                                    output ="<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2' style='width:100%;background-color:#F7F9FA;'>" +
                                            "<thead><tr style='background-color:#F7AB48;'><th colspan='2' style='text-align:left;'> Personal Information </th></tr></thead>" +
                                            "<tbody><tr><td> Reg No </td><td> &ensp;" + result.posts[i].post_id + "</td></tr>" + 
                                            "<tr><td> Name </td><td> &ensp;" + result.posts[i].sname + "</td></tr>" +      
                                            "<tr><td> Gender </td><td> &ensp;" + result.posts[i].gender  + "</td></tr>" + 
                                            "<tr><td> Blood Group </td><td> &ensp;" + result.posts[i].blood  + "</td></tr>" + 
                                            "<tr><td> D.O.B </td><td> &ensp;" + result.posts[i].dob  + "</td></tr>" + 
                                            "<tr><td> Mother Toungue </td><td> &ensp;" + result.posts[i].language  + "</td></tr>" + 
                                             "<tr><td> Native </td><td> &ensp;" + result.posts[i].native  + "</td></tr></tbody></table> <br>" +

                                            "<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>" +
                                            "<thead><tr style='background-color:#F7AB48;'><th colspan='2' style='text-align:left;'> Academic Information </th></tr></thead>" +
                                            "<tbody><tr><td> Grade </td><td> &ensp;" + result.posts[i].class + "</td></tr>" +  
                                            "<tr><td> Section </td><td> &ensp;" + result.posts[i].sec  + "</td></tr>" + 
                                            "<tr><td> Batch </td><td> &ensp;" + result.posts[i].batch  + "</td></tr></tbody></table> <br>" + 

                                            "<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>" +
                                            "<thead><tr style='background-color:#F7AB48;'><th colspan='2' style='text-align:left;'> Contact Information </th></tr></thead>" +
                                            "<tbody><tr><td> Mother's Name </td><td> &ensp;" + result.posts[i].mother  + "</td></tr>" + 
                                            "<tr><td> Father's Name </td><td> &ensp;" + result.posts[i].father  + "</td></tr></tbody></table>";
 
                                    //console.log(output); 
                                    newHTMLD.push(output); 
                                     
                            }); 
                            
                             okfine = $(".ui-content").html(newHTMLD.join("")); 
                            return okfine;  
                        }
                        
                        $("#myTable2", $.mobile.activePage).val(myFunctiond());
                         
                        } else {
                                alert('No Message!');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });  

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });

    // ---Home Work button click event--- //

            $(document).on('click', '#homeworksubmit', function() { // catch the form's submit event

            if($('#usernamee').val().length > 0 && $('#passworde').val().length > 0){

                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/homework.php', 
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/homework.php',
                    data: {action : 'authorization', formData : $('#check-homework').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') {                  
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +
                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                           " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2>Home Work</h2> " +
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div>  " +
                        " </div>" +
                        "<div data-role='content'>" + 
                       "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "</p>"+
                        "</div></div>"; 
                        $.mobile.activePage.after(stud_prof); 
                        $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
 

                          function myFunctiond() { 
         
                            var newHTMLD = []; 
                            $dates="";                     
                            var mychk = 'a';
                             $.each(result.posts, function( i, val ) {  
                                    if (mychk === 'a') {
                                        mychk = result.posts[i].hdate;
                                        newHTMLD.push("<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>" + 
                                        "<thead><tr><th colspan='2' style='background-color:#F7AB48;'>  Date: " + result.posts[i].hdate  + " </th></tr><tr style='background-color:#90C3D4;'><th>Subject</th><th>Portions</th></tr></thead><tbody>" + 
                                        "<tr><td> &ensp;" + result.posts[i].hsub  + "</td>" + 
                                        "<td> &ensp;" + result.posts[i].hdes + "</td></tr>"); 
                                    } else if((mychk != 'a'  &&  result.posts[i].hdate ===  mychk))  {
                                            mychk = result.posts[i].hdate;
                                            output ="<tr><td> &ensp;" + result.posts[i].hsub  + "</td>" + 
                                            "<td> &ensp;" + result.posts[i].hdes + "</td></tr>"; 
                                            newHTMLD.push(output);                                              
                                    } else if ((mychk != 'a'  &&  result.posts[i].hdate !=  mychk))  {
                                            mychk = result.posts[i].hdate;
                                            output ="</tbody></table> <br> <table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>" + 
                                            "<thead><tr><th colspan='2' style='background-color:#F7AB48;'> Date: " + result.posts[i].hdate  + " </th></tr><tr style='background-color:#90C3D4;'><th>Subject</th><th>Portions</th></tr></thead><tbody>" +
                                            "<tr><td> &ensp;" + result.posts[i].hsub  + "</td>" + 
                                            "<td> &ensp;" + result.posts[i].hdes + "</td></tr>"; 
                                            newHTMLD.push(output);  
                                    }

                                    //mychk = result.posts[i].hdate;
                                   
                                    //console.log(output); 
                                    //newHTMLD.push(output); 
                                     
                            });  
                             
                            
                            newHTMLD.push("</tbody></table>");   
                            okfine = $(".ui-content").html(newHTMLD.join("")); 
                            return okfine;  
                        }
                        $("#myTable2", $.mobile.activePage).val(myFunctiond());
                         
                        } else {
                                alert('No Message!');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });  

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });

// ---Bus Chart button click event--- // 

            $(document).on('click', '#bussubmit', function() { // catch the form's submit event

            if($('#usernamee').val().length > 0 && $('#passworde').val().length > 0){

                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/buschart.php', 
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/buschart.php',
                    data: {action : 'authorization', formData : $('#check-homework').serialize()},
                    type: 'post', 
                    async: 'true', 
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') {                  
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +
                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                           " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2>Bus Chart</h2> " +
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div>  " +
                        " </div>" +
                        "<div data-role='content'>" + 
                       "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "</p>"+
                        "</div></div>"; 
                        $.mobile.activePage.after(stud_prof); 
                        $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
 

                          function myFunctiond() { 
         
                            var newHTMLD = []; 
                            $dates="";                     
                            var mychk = 'a';
                             $.each(result.posts, function( i, val ) {  
                                    if (mychk === 'a') {
                                        mychk = result.posts[i].routeno;
                                        newHTMLD.push("<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>" + 
                                        "<thead><tr><th colspan='3' style='background-color:#F7AB48;'>  Route : " + result.posts[i].routeno  + " </th></tr><tr style='background-color:#90C3D4;'><th>Stop Name</th><th>Pickup Time</th> <th>Drop Time</th> </tr></thead><tbody>" + 
                                        "<tr><td> &ensp;" + result.posts[i].stopname  + "</td>" + 
                                        "<td> &ensp;" + result.posts[i].picktime  + "</td>" + 
                                        "<td> &ensp;" + result.posts[i].droptime + "</td></tr>"); 
                                    } else if((mychk != 'a'  &&  result.posts[i].routeno ===  mychk))  {
                                            mychk = result.posts[i].routeno;
                                            output ="<tr><td> &ensp;" + result.posts[i].stopname  + "</td>" + 
                                            "<td> &ensp;" + result.posts[i].picktime  + "</td>" + 
                                            "<td> &ensp;" + result.posts[i].droptime + "</td></tr>"; 
                                            newHTMLD.push(output);                                              
                                    } else if ((mychk != 'a'  &&  result.posts[i].routeno !=  mychk))  {
                                            mychk = result.posts[i].routeno;
                                            output ="</tbody></table> <br> <table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>" + 
                                            "<thead><tr><th colspan='3' style='background-color:#F7AB48;'> Route : " + result.posts[i].routeno  + " </th></tr><tr style='background-color:#90C3D4;'><th>Stop Name</th><th>Pickup Time</th> <th>Drop Time</th></tr></thead><tbody>" +
                                            "<tr><td> &ensp;" + result.posts[i].stopname  + "</td>" + 
                                            "<td> &ensp;" + result.posts[i].picktime  + "</td>" + 
                                            "<td> &ensp;" + result.posts[i].droptime + "</td></tr>"; 
                                            newHTMLD.push(output);
                                    }

                                    //mychk = result.posts[i].hdate;
                                   
                                    //console.log(output); 
                                    //newHTMLD.push(output); 
                                     
                            });  
                             
                            
                            newHTMLD.push("</tbody></table>");   
                            okfine = $(".ui-content").html(newHTMLD.join("")); 
                            return okfine;  
                        }
                        $("#myTable2", $.mobile.activePage).val(myFunctiond());
                         
                        } else {
                                alert('No Message!');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });  

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });
    
        // ---Food Menu button click event--- //

            $(document).on('click', '#foodsubmit', function() { // catch the form's submit event

            if($('#usernamef').val().length > 0 && $('#passwordf').val().length > 0){

                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/food.php', 
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/food.php',
                    data: {action : 'authorization', formData : $('#check-food').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') { 
                            
                     
                        
                
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +
                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                             " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2>Food Menu</h2> " +  
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div>  " +
                        " </div>" +   
                        "<div data-role='content'>" + 
                        "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "  </p>"+
                        "</div></div>";
 
                        $.mobile.activePage.after(stud_prof);
                        //$.mobile.changePage("#year_calendar"); 
                        $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
                        
                        function myFunctiond() { 
         
                            var newHTMLD = [];
                            
                              $.each(result.posts, function( i, val ) { 
                                    output ="<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>" +
                                            "<thead><tr><th colspan='2' style='text-align:left;background-color:#F7AB48;'>" + result.posts[i].hdate + "</th></tr></thead>" + 
                                            "<tbody><tr><td style='background-color:#90C3D4;'> Morning &ensp;</td><td>" + result.posts[i].mor + "</td></tr>" + 
                                            "<tr><td style='background-color:#90C3D4;'> Afternoon &ensp;</td><td>" + result.posts[i].aft  + "</td></tr>" + 
                                            "<tr><td style='background-color:#90C3D4;'> Evening &ensp;</td><td>" + result.posts[i].eve + "</td></tr></tbody></table><br>";
                                    //console.log(output); 
                                    newHTMLD.push(output); 
                                     
                            }); 
                            
                            okfine = $(".ui-content").html(newHTMLD.join("")); 
                            return okfine;  
                        }

                        $("#myTable2", $.mobile.activePage).val(myFunctiond());
                         
                        } else {
                                alert('No Message!');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });  

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });
    
        

    // ---Leave List Request button click event--- //

            $(document).on('click', '#leavelistsubmit', function() { // catch the form's submit event

            if($('#usernameo').val().length > 0 && $('#passwordo').val().length > 0){

                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/leave.php', 
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/leave.php',
                    data: {action : 'authorization', formData : $('#check-leavelist').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') { 
                            
                     
                       
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +

                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                           " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2>Leave Status</h2> " +  
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div>  " +
                        " </div>" +   
                        "<div data-role='content'>" + 
                       "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "  </p>"+
                        "</div></div>";
                        $.mobile.activePage.after(stud_prof);
                        //$.mobile.changePage("#year_calendar"); 
                        $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
                         function myFunctiond() { 
         
                            var newHTMLD = [];
                            
                            //newHTMLD.push("");

                             $.each(result.posts, function( i, val ) { 
                                    output ="<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2' style='width:100%;background-color:#F7F9FA;'>" + 
                                    "<thead style='background-color:#F7AB48;' > <th style='text-align:left;'><b>" + result.posts[i].ldate  + "</b></th><th style='text-align:left;'><b>" + result.posts[i].lstatus  + "</b></th> </thead>" + 
                                    "<tbody><tr><td colspan='2'>&ensp;&ensp;" + result.posts[i].ldes + "</td></tr></tbody></table><br>";
                                    //console.log(output); 
                                    newHTMLD.push(output); 
                                     
                             }); 
                            
                             okfine = $(".ui-content").html(newHTMLD.join("")); 
                            return okfine;  
                        }
                
                        $("#myTable2", $.mobile.activePage).val(myFunctiond());
                         
                        } else {
                                alert('No Message!');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });  

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });
    

    // ---Report Card button click event--- //

            $(document).on('click', '#reportsubmit', function() { // catch the form's submit event

            if($('#usernameh').val().length > 0 && $('#passwordh').val().length > 0){

                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/report.php', 
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/report.php',
                    data: {action : 'authorization', formData : $('#check-report').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') { 
                        
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +

                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                            " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2> Report Card </h2> " +  
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div> " +
                        " </div>" +
                        "<div data-role='content'>" + 
                        "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "  </p>"+
                        "</div></div>";
                        $.mobile.activePage.after(stud_prof);
                        //$.mobile.changePage("#year_calendar"); 
                         $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
                        

                     
                        function myFunctiond() { 
         
                            var newHTMLD = [];
                            
                            var mychk = 'hk';

                            
                            //newHTMLD.push("<tr><td> "+ result.sno +" </td><td>" ); 
                             $.each(result.poststr, function( i, val ) { 

                                    if (mychk === 'hk') {

                                      newHTMLD.push("<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2' style='width:100%;background-color:#F7F9FA;'>" + 
                              "<thead><tr style='background-color:#F7AB48;'><th colspan='2'>" + result.poststr[i].mid + "</th></tr><tr style='background-color:#90C3D4;'><th> Subject </th><th>Grade</th></tr></thead><tbody>");

                                    };

                                    if ( (mychk != 'hk'  &&  result.poststr[i].mid != mychk))  {

                                             
                                            output ="</tbody> </br> <table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2' style='width:100%;background-color:#F7F9FA;'>" + 
                                            "<thead><tr style='background-color:#F7AB48;'><th colspan='2'>" + result.poststr[i].mid + "</th></tr><tr style='background-color:#90C3D4;'><th> Subject </th>" +
                                            "<th>Grade</th></tr></thead><tbody><tr><td>" + result.poststr[i].sub1 + "</td><td>" + result.poststr[i].m1 + "</td></tr>" + 
                                            "<tr><td>" + result.poststr[i].sub2 + "</td><td>" + result.poststr[i].m2 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub3 + "</td><td>" + result.poststr[i].m3 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub4 + "</td><td>" + result.poststr[i].m4 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub5 + "</td><td>" + result.poststr[i].m5 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub6 + "</td><td>" + result.poststr[i].m6 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub7 + "</td><td>" + result.poststr[i].m7 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub8 + "</td><td>" + result.poststr[i].m8 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub9 + "</td><td>" + result.poststr[i].m9 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub10 + "</td><td>" + result.poststr[i].m10 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub11 + "</td><td>" + result.poststr[i].m11 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub12 + "</td><td>" + result.poststr[i].m12 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub13 + "</td><td>" + result.poststr[i].m13 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub14 + "</td><td>" + result.poststr[i].m14 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub15 + "</td><td>" + result.poststr[i].m15 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub16 + "</td><td>" + result.poststr[i].m16 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub17 + "</td><td>" + result.poststr[i].m17 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub18 + "</td><td>" + result.poststr[i].m18 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub19 + "</td><td>" + result.poststr[i].m19 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub20 + "</td><td>" + result.poststr[i].m20 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub21 + "</td><td>" + result.poststr[i].m21 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub22 + "</td><td>" + result.poststr[i].m22 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub23 + "</td><td>" + result.poststr[i].m23 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub24 + "</td><td>" + result.poststr[i].m24 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub25 + "</td><td>" + result.poststr[i].m25 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub26 + "</td><td>" + result.poststr[i].m26 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub27 + "</td><td>" + result.poststr[i].m27 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub28 + "</td><td>" + result.poststr[i].m28 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub29 + "</td><td>" + result.poststr[i].m29 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub30 + "</td><td>" + result.poststr[i].m30 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub31 + "</td><td>" + result.poststr[i].m31 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub32 + "</td><td>" + result.poststr[i].m32 + "</td></tr>";
                                        //console.log(output); 
                                        newHTMLD.push(output);


                                            }  else { 
                                            
                                            output ="<tr><td>" + result.poststr[i].sub1 + "</td><td>" + result.poststr[i].m1 + "</td></tr>" + 
                                            "<tr><td>" + result.poststr[i].sub2 + "</td><td>" + result.poststr[i].m2 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub3 + "</td><td>" + result.poststr[i].m3 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub4 + "</td><td>" + result.poststr[i].m4 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub5 + "</td><td>" + result.poststr[i].m5 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub6 + "</td><td>" + result.poststr[i].m6 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub7 + "</td><td>" + result.poststr[i].m7 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub8 + "</td><td>" + result.poststr[i].m8 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub9 + "</td><td>" + result.poststr[i].m9 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub10 + "</td><td>" + result.poststr[i].m10 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub11 + "</td><td>" + result.poststr[i].m11 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub12 + "</td><td>" + result.poststr[i].m12 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub13 + "</td><td>" + result.poststr[i].m13 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub14 + "</td><td>" + result.poststr[i].m14 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub15 + "</td><td>" + result.poststr[i].m15 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub16 + "</td><td>" + result.poststr[i].m16 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub17 + "</td><td>" + result.poststr[i].m17 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub18 + "</td><td>" + result.poststr[i].m18 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub19 + "</td><td>" + result.poststr[i].m19 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub20 + "</td><td>" + result.poststr[i].m20 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub21 + "</td><td>" + result.poststr[i].m21 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub22 + "</td><td>" + result.poststr[i].m22 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub23 + "</td><td>" + result.poststr[i].m23 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub24 + "</td><td>" + result.poststr[i].m24 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub25 + "</td><td>" + result.poststr[i].m25 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub26 + "</td><td>" + result.poststr[i].m26 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub27 + "</td><td>" + result.poststr[i].m27 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub28 + "</td><td>" + result.poststr[i].m28 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub29 + "</td><td>" + result.poststr[i].m29 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub30 + "</td><td>" + result.poststr[i].m30 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub31 + "</td><td>" + result.poststr[i].m31 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub32 + "</td><td>" + result.poststr[i].m32 + "</td></tr>";
                                    //console.log(output); 
                                    newHTMLD.push(output); 
                                            } 

                                            mychk = result.poststr[i].mid;
                            });
                               
                            okfine = $(".ui-content").html(newHTMLD.join("")); 
                            return okfine;  
                        }
                
                        $("#myTable2", $.mobile.activePage).val(myFunctiond());
                         
                        } else {
                                alert('Report Card not Found!');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });  

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });
    
        // ---Fees button click event--- //

            $(document).on('click', '#feessubmit', function() { // catch the form's submit event

            if($('#usernamegh').val().length > 0 && $('#passwordgh').val().length > 0){ 

                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/fees.php', 
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/fees.php', 
                    data: {action : 'authorization', formData : $('#check-fees').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                     success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') { 
                        
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +

                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                            " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2> Fees Detail </h2> " +  
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div> " +
                        " </div>" +
                        "<div data-role='content'>" + 
                        "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "  </p>"+
                        "</div></div>";
                        $.mobile.activePage.after(stud_prof);
                        //$.mobile.changePage("#year_calendar"); 
                         $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
                        

                     
                        function myFunctiond() { 
         
                            var newHTMLD = [];
                            
                            var mychk = 'hk';

                            
                            //newHTMLD.push("<tr><td> "+ result.sno +" </td><td>" ); 
                             $.each(result.poststr, function( i, val ) { 

                                    if (mychk === 'hk') {

                                      newHTMLD.push("<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2' style='width:100%;background-color:#F7F9FA;'>" + 
                              "<thead><tr style='background-color:#F7AB48;'><th colspan='2'>" + result.poststr[i].mid + "</th></tr><tr style='background-color:#90C3D4;'><th> Particulars </th><th>Fee</th></tr></thead><tbody>");

                                    };

                                    if ( (mychk != 'hk'  &&  result.poststr[i].mid != mychk))  {

                                             
                                            output ="</tbody> </br> <table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2' style='width:100%;background-color:#F7F9FA;'>" + 
                                            "<thead><tr style='background-color:#F7AB48;'><th colspan='2'>" + result.poststr[i].mid + "</th></tr><tr style='background-color:#90C3D4;'><th> Particulars </th>" +
                                            "<th>Fee</th></tr></thead><tbody><tr><td>" + result.poststr[i].sub1 + "</td><td>" + result.poststr[i].m1 + "</td></tr>" + 
                                            "<tr><td>" + result.poststr[i].sub2 + "</td><td>" + result.poststr[i].m2 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub3 + "</td><td>" + result.poststr[i].m3 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub4 + "</td><td>" + result.poststr[i].m4 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub5 + "</td><td>" + result.poststr[i].m5 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub6 + "</td><td>" + result.poststr[i].m6 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub7 + "</td><td>" + result.poststr[i].m7 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub8 + "</td><td>" + result.poststr[i].m8 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub9 + "</td><td>" + result.poststr[i].m9 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub10 + "</td><td>" + result.poststr[i].m10 + "</td></tr>";
                                        //console.log(output); 
                                        newHTMLD.push(output);


                                            }  else { 
                                            
                                            output ="<tr><td>" + result.poststr[i].sub1 + "</td><td>" + result.poststr[i].m1 + "</td></tr>" + 
                                            "<tr><td>" + result.poststr[i].sub2 + "</td><td>" + result.poststr[i].m2 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub3 + "</td><td>" + result.poststr[i].m3 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub4 + "</td><td>" + result.poststr[i].m4 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub5 + "</td><td>" + result.poststr[i].m5 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub6 + "</td><td>" + result.poststr[i].m6 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub7 + "</td><td>" + result.poststr[i].m7 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub8 + "</td><td>" + result.poststr[i].m8 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub9 + "</td><td>" + result.poststr[i].m9 + "</td></tr>"+
                                            "<tr><td>" + result.poststr[i].sub10 + "</td><td>" + result.poststr[i].m10 + "</td></tr>"; 
                                    //console.log(output); 
                                    newHTMLD.push(output); 
                                            } 

                                            mychk = result.poststr[i].mid;
                            });
                               
                            okfine = $(".ui-content").html(newHTMLD.join("")); 
                            return okfine;  
                        }
                
                        $("#myTable2", $.mobile.activePage).val(myFunctiond());
                         
                        } else {
                                alert('Fee details not Found!');
                        }
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });
    

        // ---Exam Time Table Card button click event--- //

            $(document).on('click', '#examsubmit', function() { // catch the form's submit event

            if($('#usernamei').val().length > 0 && $('#passwordi').val().length > 0){
                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/exam.php',
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/exam.php',
                    data: {action : 'authorization', formData : $('#check-exam').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful 
                        var counter = 0;  
                       if(result.status == 'success') {  
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +
                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                          " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2> Exam Time Table</h2> " +  
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div>  " +
                        " </div>" +   
                        "<div data-role='content'>" + 
                        "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "  </p>"+
                        "</div></div>";

                        $.mobile.activePage.after(stud_prof);
                        //$.mobile.changePage("#year_calendar"); 
                        $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
                        function myFunctiond() {  
                            var newHTMLD = []; 
                             var mychk = 'aa';
                             $.each(result.posts, function( i, val ) {   
                                    if (mychk === 'aa') { 
                                       newHTMLD.push("<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>" + 
                                    "<thead><tr style='background-color:#F7AB48;'><th colspan='4' style='text-align:left;'>" + result.posts[i].smid  + " </th></tr><tr style='background-color:#90C3D4;'><th>Subject</th><th>Portions</th><th>Date</th><th>Session</th></tr></thead><tbody>");
 
                                    };
                                
                                    if ( (mychk != 'aa'  &&  result.posts[i].smid != mychk))  {

                                            output ="</tbody></table><br> <table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'  style='width:100%;background-color:#F7F9FA;'>" + 
                                            "<thead><tr style='background-color:#F7AB48;'><th colspan='4' style='text-align:left;'>" + result.posts[i].smid  + " </th></tr><tr style='background-color:#90C3D4;'><th>Subject</th><th>Portions</th><th>Date</th><th>Session</th></tr></thead><tbody>" +
                                            "<tr><td>" + result.posts[i].subject  + "&ensp;</td>" + 
                                            "<td>" + result.posts[i].portions + "</td>" +
                                            "<td>" + result.posts[i].edate + "</td>" +
                                            "<td>" + result.posts[i].ses + "</td></tr>"; 
                                            }  else { 
                                            output ="<tr><td>" + result.posts[i].subject  + "&ensp;</td>" + 
                                            "<td>" + result.posts[i].portions + "</td>" +
                                            "<td>" + result.posts[i].edate + "</td>" +
                                            "<td>" + result.posts[i].ses + "</td></tr>"; 
                                            }

                                    mychk = result.posts[i].smid;
                                   
                                    //console.log(output); 
                                    newHTMLD.push(output); 
                                     
                            });  
                             
                            
                            newHTMLD.push("</tbody></table>");   
                            okfine = $(".ui-content").html(newHTMLD.join("")); 
                            return okfine;   
                             
                        }
                        $("#myTable2", $.mobile.activePage).val(myFunctiond());
                         
                        } else {
                                alert('No Message!');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });  

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });
    

        // ---Class Time Table Card button click event--- //

            $(document).on('click', '#timesubmit', function() { // catch the form's submit event

            if($('#usernamej').val().length > 0 && $('#passwordj').val().length > 0){

                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/time.php',
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/time.php',
                    data: {action : 'authorization', formData : $('#check-time').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') { 
                            
                     
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +
                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                            " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2>Class Time Table</h2> " +  
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div>  " +
                        " </div>" +   
                        "<div data-role='content'>" + 
                        "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "  </p>"+
                        "</div></div>";
   

                        $.mobile.activePage.after(stud_prof);
                        //$.mobile.changePage("#year_calendar"); 
                        $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
                        
                        function myFunctiond() { 
         
                            var newHTMLD = [];
                            
                            newHTMLD.push("<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2' style='width:100%;background-color:#F7F9FA;'>" + 
                              "<thead  style='background-color:#F7AB48;'><th>TIME/<br>DAY</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></thead> <tbody>");

                             $.each(result.posts, function( i, val ) { 
                                     output ="<tr><td>" + result.posts[i].ptime + "</td>" + 
                                            "<td>" + result.posts[i].mon + "</td>" +
                                            "<td>" + result.posts[i].tue + "</td>" +
                                            "<td>" + result.posts[i].wed + "</td>" +
                                            "<td>" + result.posts[i].thu + "</td>" +
                                            "<td>" + result.posts[i].fri + "</td>" +
                                            "<td>" + result.posts[i].sat + "</td></tr>";
                                     
                                    //console.log(output); 
                                    newHTMLD.push(output); 
                                     
                            }); 
                            
                            newHTMLD.push("</tbody></table>");   
                            okfine = $(".ui-content").html(newHTMLD.join("")); 
                            return okfine;  
                        }
                
                        $("#myTable2", $.mobile.activePage).val(myFunctiond());
                         
                        } else {
                                alert('No Message!');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });  

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });


        
        // ---Image Gallery Table Card button click event--- //

            $(document).on('click', '#imagesubmit', function() { // catch the form's submit event

            if($('#usernamek').val().length > 0 && $('#passwordk').val().length > 0){

                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/gallery.php', 
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/gallery.php', 
                    data: {action : 'authorization', formData : $('#check-image').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') {  
                        
                
                        stud_prof = 
                        "<style>" +
                        "th {" +
                        "    border-bottom: 1px solid #d6d6d6;" +
                        "}" +

                        "tr:nth-child(even) {" +
                        "    background: #e9e9e9;" +
                        "}" +
                        "</style>" +
                        "<div id='year_calendar' data-role='page' class='ui-page ui-page-theme-f'>" + 
                         "<div data-role='header' data-position='fixed'  data-tap-toggle='false' data-transition='none'  data-theme='f'>" +
                            " <div data-type='horizontal' class='ui-btn-left'> " +
                               "  <table>" +
                                 " <tr>" +
                                 "   <td>" +
                                   " <a href='#arunhome' class='ui-btn ui-icon-carat-l ui-btn-icon-notext ui-corner-all'></a>" +
                                    "</td>" +
                                   "  <td>" +
                                    "  <h2>Image Gallery</h2> " +  
                                    " </td>" +
                                    "</tr>" +
                                  "</table> " +
                             "</div>  " +
                        " </div>" +   
                        "<div data-role='content'>" + 
                        "</div>" +
                        "<div class='ui-body-gh' data-role='footer' data-position='fixed' data-tap-toggle='false' data-transition='none' data-theme='h'> "+
                             "<p style='text-align:center;''> Powered by www.themaxtech.com  "+
                               "  </p>"+
                        "</div></div>";
                        $.mobile.activePage.after(stud_prof);
                        //$.mobile.changePage("#year_calendar"); 
                        $.mobile.changePage( "#year_calendar", {transition: "none", reloadPage:false} );
                        function myFunctiond() { 
         
                            var newHTMLD = [];
                            
                            newHTMLD.push("<table data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow' id='myTable2'>" + 
                              "<tbody>");

                             $.each(result.posts, function( i, val ) { 
                                    output ="<tr><td> ID </td><td>" + result.posts[i].sno + "</td><td></tr>"; 
                                    //console.log(output); 
                                    newHTMLD.push(output); 
                                     
                            }); 
                            
                            newHTMLD.push("</tbody></table>");   
                            okfine = $(".ui-content").html(newHTMLD.join("")); 
                            return okfine;  
                        }
                        $("#stud_message", $.mobile.activePage).val(myFunctiond());
                         
                        } else {
                                alert('No Message!');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });  

            } else {
                alert('Please check Class, Sec fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });


            // ---Logout button click event--- //

            $(document).on('click', '#logoutsubmit', function() { // catch the form's submit event
            //alert("am clicked");
            $.jStorage.deleteKey("mykey");
            $.jStorage.flush();
            localStorage.clear();
            userHandler.status = '';
            $.mobile.changePage("#login");
            return false; // cancel original event to prevent form submitting
        });

    
 
    // --- END CLICK EVENT--- //


    } else if(activePage.attr('id') === 'arunleave') {

       //Leave Request Button Click Event

        $(document).on('click', '#leavesubmit', function() { // catch the form's submit event
            if($('#regnot').val().length > 0 && $('#usernamet').val().length > 0 && $('#clat').val().length > 0 && $('#sect').val().length > 0 && $('#datt').val().length > 0 && $('#messt').val().length > 0){
                    //$.ajax({url: 'http://app.themaxtech.dev/api/ios/leaveform.ph',
                    $.ajax({url: 'http://app.themaxtech.com/api/ios/leaveform.php',
                    data: {action : 'authorization', formData : $('#check-leave').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful

                        var counter = 0; 
                         
                       if(result.status == 'success') { 
 
                            alert('Successfully sent!...');
                            //$.mobile.changePage("#arunhome"); 
                      
                        } else {
                                alert('Sending Failed');
                        }  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!'); 
                    }
                });                  
            } else {
                alert('Please check username, password fields');
            }  
    
            return false; // cancel original event to prevent form submitting
        });




    } else if(activePage.attr('id') === 'yearcalendar') {
        activePage.find('.ui-content').text('Wellcome ' + userHandler.username + ' ---   upass= ' + userHandler.userpass + 
            ' ---   uclass= ' + userHandler.userclass + ' ---   usec= ' +  userHandler.usersec );
    }
});

$(document).on('pagehide', '#page', function(){ 
    $(this).remove();
    $( ".ui-content" ).remove();
});

$(document).on('pagehide', '#stud_prof', function(){ 
    $(this).remove();
    $( ".ui-content" ).remove();
}); 
$(document).on('pagehide', '#stud_message', function(){ 
    $(this).remove();
    $( ".ui-content" ).remove();
});

$(document).on('pagehide', '#arunleave', function(){ 
    $(this).remove();
    $( ".ui-content" ).remove();
});
 
$(document).on('pagehide', '#year_calendar', function(){ 
    $(this).remove();
    $( ".ui-content" ).remove();
}); 
 

$(document).on("pagebeforehide","year_calendar",function(event){

    //alert("hii");
    $( ".ui-content" ).remove();

}); 
$(document).on('pageshow', '#login', function(){     
    var amnew = $.jStorage.get("wpnid");
    var amnews = $.jStorage.get("appid");
    var amnewd = $.jStorage.get("gcmid");
 
    
});
$(document).on('pageshow', '#homepage', function(){     
        
    var valuesss = $.jStorage.get("mykey");
    if (!valuesss) {
        //alert("hi" + valuesss);
        $.mobile.changePage("#login"); 

    } else {
        arung1 = $.jStorage.get("username");
        arung2 = $.jStorage.get("status");
        arung3 = $.jStorage.get("userpass");
        arung4 = $.jStorage.get("userclass");
        arung5 = $.jStorage.get("usersec");
        arung6 = $.jStorage.get("useroriname"); 
        arung7 = $.jStorage.get("appid");  
        arung111 = $.jStorage.get("gcmid");
        arung222 = $.jStorage.get("wpnid"); 
        schoolcode = $.jStorage.get("schoolcode");  
        

        userHandler.username    = arung1;
        userHandler.userpass    = arung3;
        userHandler.userclass   = arung4;
        userHandler.usersec     = arung5;
        userHandler.useroriname = arung6;
        userHandler.status      = arung2;
        userHandler.appid       = arung7;
        userHandler.gcmid       = arung111;
        userHandler.wpnid       = arung222; 
        userHandler.schoolcode  = schoolcode;

     }
});
$(document).on('pageshow', '#arunhome', function(){     
        
    var valuesss = $.jStorage.get("mykey");
    if (!valuesss) {
        //alert("hi" + valuesss);
        $.mobile.changePage("#login"); 
    } else{

        arung1 = $.jStorage.get("username");
        arung2 = $.jStorage.get("status");
        arung3 = $.jStorage.get("userpass");
        arung4 = $.jStorage.get("userclass");
        arung5 = $.jStorage.get("usersec");
        arung6 = $.jStorage.get("useroriname"); 
        arung7 = $.jStorage.get("appid");
        arung111 = $.jStorage.get("gcmid");
        arung222 = $.jStorage.get("wpnid");  
        schoolcode = $.jStorage.get("schoolcode");   

        userHandler.username    = arung1;
        userHandler.userpass    = arung3;
        userHandler.userclass   = arung4;
        userHandler.usersec     = arung5;
        userHandler.useroriname = arung6;
        userHandler.status      = arung2;
        userHandler.appid       = arung7;
        userHandler.gcmid       = arung111;
        userHandler.wpnid       = arung222;
        userHandler.schoolcode = schoolcode;
 

       //alert('My name is ' + userHandler.username);
       $("#usernamea", $.mobile.activePage).val(userHandler.username);
       $("#passworda", $.mobile.activePage).val(userHandler.userpass);
       $("#schoolcodea", $.mobile.activePage).val(userHandler.schoolcode);
       

       $("#usernameb", $.mobile.activePage).val(userHandler.username);
       $("#passwordb", $.mobile.activePage).val(userHandler.userpass);
       $("#classb", $.mobile.activePage).val(userHandler.userclass);
       $("#secb", $.mobile.activePage).val(userHandler.usersec);
       $("#schoolcodeb", $.mobile.activePage).val(userHandler.schoolcode);

       $("#usernamec", $.mobile.activePage).val(userHandler.username);
       $("#passwordc", $.mobile.activePage).val(userHandler.userpass);
       $("#schoolcodec", $.mobile.activePage).val(userHandler.schoolcode);

       $("#usernamed", $.mobile.activePage).val(userHandler.username);
       $("#passwordd", $.mobile.activePage).val(userHandler.userpass);
       $("#schoolcoded", $.mobile.activePage).val(userHandler.schoolcode);

       $("#usernamee", $.mobile.activePage).val(userHandler.username);
       $("#passworde", $.mobile.activePage).val(userHandler.userpass);
       $("#classe", $.mobile.activePage).val(userHandler.userclass);
       $("#sece", $.mobile.activePage).val(userHandler.usersec);
       $("#schoolcodee", $.mobile.activePage).val(userHandler.schoolcode);

       $("#usernamef", $.mobile.activePage).val(userHandler.username);
       $("#passwordf", $.mobile.activePage).val(userHandler.userpass);
       $("#schoolcodef", $.mobile.activePage).val(userHandler.schoolcode);

       $("#usernameg", $.mobile.activePage).val(userHandler.username);
       $("#passwordg", $.mobile.activePage).val(userHandler.userpass);
       $("#schoolcodeg", $.mobile.activePage).val(userHandler.schoolcode);

       $("#usernameh", $.mobile.activePage).val(userHandler.username);
       $("#passwordh", $.mobile.activePage).val(userHandler.userpass);
       $("#classh", $.mobile.activePage).val(userHandler.userclass);
       $("#sech", $.mobile.activePage).val(userHandler.usersec);
       $("#schoolcodeh", $.mobile.activePage).val(userHandler.schoolcode);

       $("#usernamegh", $.mobile.activePage).val(userHandler.username);
       $("#passwordgh", $.mobile.activePage).val(userHandler.userpass);
       $("#classgh", $.mobile.activePage).val(userHandler.userclass);
       $("#secgh", $.mobile.activePage).val(userHandler.usersec);
       $("#schoolcodegh", $.mobile.activePage).val(userHandler.schoolcode);

       $("#usernamei", $.mobile.activePage).val(userHandler.username);
       $("#passwordi", $.mobile.activePage).val(userHandler.userpass);
       $("#classi", $.mobile.activePage).val(userHandler.userclass);
       $("#seci", $.mobile.activePage).val(userHandler.usersec);
       $("#schoolcodei", $.mobile.activePage).val(userHandler.schoolcode);

       $("#usernamej", $.mobile.activePage).val(userHandler.username);
       $("#passwordj", $.mobile.activePage).val(userHandler.userpass);
       $("#classj", $.mobile.activePage).val(userHandler.userclass);
       $("#secj", $.mobile.activePage).val(userHandler.usersec);
       $("#schoolcodej", $.mobile.activePage).val(userHandler.schoolcode);

       $("#usernameo", $.mobile.activePage).val(userHandler.username);
       $("#passwordo", $.mobile.activePage).val(userHandler.userpass);
       $("#classo", $.mobile.activePage).val(userHandler.userclass);
       $("#seco", $.mobile.activePage).val(userHandler.usersec);
       $("#schoolcodeo", $.mobile.activePage).val(userHandler.schoolcode);


       $("#usernamek", $.mobile.activePage).val(userHandler.username);
       $("#passwordk", $.mobile.activePage).val(userHandler.userpass);
       $("#schoolcodek", $.mobile.activePage).val(userHandler.schoolcode);
       

       
 
    }

       

}); 

$(document).on('pageshow', '#arunleave', function(){     


        var dmy = new Date();

        var monthmy = dmy.getMonth()+1;
        var daymy = dmy.getDate();

        var outputmy = dmy.getFullYear() + '/' +
            (monthmy<10 ? '0' : '') + monthmy + '/' +
            (daymy<10 ? '0' : '') + daymy;

        var outputmy = (daymy<10 ? '0' : '') + daymy + '-' +
            (monthmy<10 ? '0' : '') + monthmy + '-' +
            dmy.getFullYear(); 
        
       $("#regnot", $.mobile.activePage).val(userHandler.username);
       $("#usernamet", $.mobile.activePage).val(userHandler.useroriname); 
       $("#clat", $.mobile.activePage).val(userHandler.userclass);
       $("#sect", $.mobile.activePage).val(userHandler.usersec);
       $("#datt", $.mobile.activePage).val(outputmy);  
       $("#schoolcodet", $.mobile.activePage).val(userHandler.schoolcode); 

});  
$(document).on('pagecontainerbeforechange', function (e, ui) {
        $(document).off('click', '#submit').on('click', '#submit',function(e) {
                        //alert('Year cal click');
    }); 
        
$(document).off('click', '#attendance').on('click', '#attendance',function(e) {
                        //alert('Button click');
                    }); 

$(document).off('click', '#feessubmit').on('click', '#feessubmit',function(e) {
                        //alert('Button click');
                    }); 

$(document).off('click', '#health').on('click', '#health',function(e) {
                        //alert('Button click');
                    }); 


 $(document).off('click', '#prosubmit').on('click', '#prosubmit',function(e) {
                        //alert('Button click');
                    }); 

 $(document).off('click', '#homeworksubmit').on('click', '#homeworksubmit',function(e) {
                        //alert('Button click');
                    });

 $(document).off('click', '#bussubmit').on('click', '#bussubmit',function(e) {
                        //alert('Button click');
                    });
 
 $(document).off('click', '#foodsubmit').on('click', '#foodsubmit',function(e) {
                        //alert('Button click');
                    }); 


$(document).off('click', '#leavelistsubmit').on('click', '#leavelistsubmit',function(e) {
                        //alert('Button click');
                    }); 
        

 $(document).off('click', '#reportsubmit').on('click', '#reportsubmit',function(e) {
                        //alert('Button click');
                    }); 
   

 $(document).off('click', '#examsubmit').on('click', '#examsubmit',function(e) {
                        //alert('Button click');
                    }); 
   
  $(document).off('click', '#timesubmit').on('click', '#timesubmit',function(e) {
                        //alert('Button click');
                    }); 
   
   $(document).off('click', '#logoutsubmit').on('click', '#logoutsubmit',function(e) {
                        //alert('Button click');
                    }); 
   
   
    var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    
    if(activePage.attr('id') === 'arunhome') {
        var to = ui.toPage;
         
        if (typeof to  === 'string') {
            var u = $.mobile.path.parseUrl(to);
            to = u.hash || '#' + u.pathname.substring(1);
              
            if (to === '#login' && userHandler.status === 'success') {
                alert('You cant open a login page while youre still logged on!');
                //e.preventDefault();
                //e.stopPropagation(); 
                //mobile.changePage("#arunhome"); 
 
                //$.mobile.changePage( "#arunhome", {transition: "none", reloadPage:false} );
                // remove active status on a button if a transition was triggered with a button
                //$('#back-btn').removeClass('ui-btn-active ui-shadow').css({'box-shadow':'0 0 0 #3388CC'});
            } 
        }
    }
    if(activePage.attr('id') === 'homepage') {
        var to = ui.toPage; 
        if (typeof to  === 'string') {
            var u = $.mobile.path.parseUrl(to);
            to = u.hash || '#' + u.pathname.substring(1); 
            if (to === '#login' && userHandler.status === 'success') {
               // e.preventDefault();
               // e.stopPropagation(); 
            // if (e.originalEvent.defaultPrevented) return; 
               // mobile.changePage("#homepage"); 
               // $('#back-btn').removeClass('ui-btn-active ui-shadow').css({'box-shadow':'0 0 0 #3388CC'});
            } 
        }
    }

  if(activePage.attr('id') === 'year_calendar') {

       //alert("am clicked");
       // $.mobile.changePage("#arunhome"); 

        var tos = ui.toPage;
         
        if (typeof tos  === 'string') {
            var u = $.mobile.path.parseUrl(tos);
            tos = u.hash || '#' + u.pathname.substring(1);
            //alert('am 11111clicked!');
             
             if (tos === '#arunhome' && userHandler.status === 'success') {
             //   if (tos == '#unhome') {
                 
               //console.log("Final"); 
               //console.log($('.ui-page-active').attr('id')); 

               $( ".ui-content" ).remove();  
                //alert('am 2222clicked!');
                
               // $.mobile.activePage.after("#year_calendar");
                //$.mobile.changePage("#arunhome");
                //$("#myTable2", $.mobile.activePage).val(myFunction2());
 
                //$url='index.html?#arunhome';
                // $.mobile.changePage('$url');
                //e.preventDefault();
                //e.stopPropagation(); 
                //$.mobile.changePage("#arunhome"); 
                // remove active status on a button if a transition was triggered with a button
                //$('#back-btn').removeClass('ui-btn-active ui-shadow').css({'box-shadow':'0 0 0 #3388CC'});
            } 
        }
         
    }
    

});
 
 