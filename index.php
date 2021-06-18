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
  <script type="text/javascript" src="js/task_schema.js?2"></script>
</section>

<?php
  include_once 'footer.php';
?>
