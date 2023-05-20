<?php
  $inputValue = $_POST['Value'];

  function isRequired($inputValue){
    echo $inputValue;
  }
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <form method="post" action="" class="form">
    <input type="text" name="Value" id="">
    <input type="submit" value="Submit">
  </form>
</body>
</html>
