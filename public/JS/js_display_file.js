$(function (){

        var socket = io(),$status = $('p#status'),$tail = $('ul#tail');
        
        socket.on ('connect', function (){
                console.log("Socket connected");
        });

        socket.on ('error', function (error){
                $status.html ( "Error: " + error );
        });

        socket.on ('data', function (data){

                $.each (data.lines, function (key, line){
                        if(line.length == 0)
                                return;
        
                        
                        if(grep=='none'){
                                $tail.append ('<li>' + line + '</li>');
                        }
                        else if (line.indexOf(grep)!=-1){
                                $tail.append ('<li>' + line + '</li>');
                        }
                        $("html, body").scrollTop($("#withoutreason").offset().top);
                });
        });
        
        var $buttonstop = $('button#stop');
        $buttonstop.on('click', function() {
                socket.disconnect();
                console.log('disconnected');
        });

});