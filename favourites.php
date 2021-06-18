<!--Splitting the header and footer into separate documents makes things easier!-->
<?php
  include_once 'header.php';
?>

<section class="index-intro">
  <h1>Create tasks.json</h1>
</section>

 <section class="index-categories">
<form></form>
  <div id="res" class="alert"></div>
  <script type="text/javascript" src="jsonform/deps/jquery.min.js"></script>
  <script type="text/javascript" src="jsonform/deps/underscore.js"></script>
  <script type="text/javascript" src="jsonform/deps/opt/jsv.js"></script>
  <script type="text/javascript" src="jsonform/lib/jsonform.js"></script>
  <script type="text/javascript" src="js/task_json_favourite.js"></script>
  <script>new_task_form(' {"label": "test","type": "shell","command": "cmd","args": ["1","2","3"]}');</script>
  
  <form action="#">
  <div class="switch">
    <input id="switch-1" type="checkbox" class="switch-input" />
    <label for="switch-1" class="switch-label">Switch</label>
  </div>
</form>

</section>




<script type="text/javascript">

   function loadCSS(filename){ 
      var file = document.createElement("link");
      file.setAttribute("rel", "stylesheet");
      file.setAttribute("type", "text/css");
      file.setAttribute("href", filename);
      document.head.appendChild(file);
   }

   loadCSS("css/favourites.css");
</script>


<?php
  include_once 'footer.php';
?>
