<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library API test</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <style>
        #get_toc_from_api_button{
            width:50%;
        }
        #get_toc_from_api_button ul li{
            width: 40%;
            list-style: none;
            padding:10px 10px;
            display: inline-grid;

        }
        #get_toc_from_api_button ul li input, select{
            width: 100%;
            margin-bottom:5px;
            display: block;
            height: 35px;
        }
        .error, .recap_error{
            color:red;
        }
    </style>
</head>
<body>
    <div id="get_toc_from_api_button"></div>
    <br/>

  

    
    
    
    <script src="https://tools.market.biz/pcaptcha.js"></script>

    <script src="get-toc-lib.js"></script>
    <script>
        $(document).ready(function(){ 
            checkToc();

        });
    </script>
    
</body>
</html>
