<!--Splitting the header and footer into separate documents makes things easier!-->
<?php
  include_once 'header.php';
?>

<section class="index-intro">
    <h1>My task list</h1>
</section>

<section class="index-categories">
    <form></form>
    <div id="res" class="alert"></div>
    <script type="text/javascript" src="jsonform/deps/jquery.min.js"></script>
    <script type="text/javascript" src="jsonform/deps/underscore.js"></script>
    <script type="text/javascript" src="jsonform/deps/opt/jsv.js"></script>
    <script type="text/javascript" src="jsonform/lib/jsonform.js"></script>
    <script type="text/javascript" src="js/task_json_favourite.js"></script>
    <script type="text/javascript" src="js/download_button.js"></script>

</section>


<script type="text/javascript">
$.get(
        "includes/favourites.inc.php",
        function(response) {
            var i = 0;
            while(response.hasOwnProperty("task_" + i))
            {
            var task = response["task_" + i];
            var task_name = response["task_name_" + i];
            new_task_form(task);
            i += 1;
            }
        }, 'json'
    );
</script>


<button class="btn_download" onclick="on_button_click()" ><i class="fa fa-download"></i>Download tasks.json</button>

<script type="text/javascript">
    function loadCSS(filename) {
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
