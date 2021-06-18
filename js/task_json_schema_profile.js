   
$('form').jsonForm({
  "schema": {
          "label": {
            "type": "string",
            "title": "label",
            "required": true
          },
          "type": {
            "type": "string",
            "title": "type",
            "enum": [ "shell", "process"]
          },
          "command": {
            "type": "string",
            "title": "command"
          },
          "args": {
         "type": "array",
         "items": {
             "type": "string",
             "title": "argument {{idx}}"
           }
        }         
  },
"form": [
    "label",
    "type",
    "command",
    "args",
    {
        "type": "submit",
        "title": "Add to favourite",       
    },
    
    
    
  ],
    
 "onSubmit": function (errors, values) {
    if (errors) {
      alert('Check the form for invalid values!');
      return;
    }
    var task_name = values["label"];
     console.log(task_name);
    var json_str = JSON.stringify(values);
    $.ajax({
    type: "POST",
    url: "submission.php",
    data: {
    task: json_str,
    task_name: task_name
    }});
    }
});


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}