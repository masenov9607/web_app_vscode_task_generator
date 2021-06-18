   $('form').jsonForm({
  "schema": {
    "tasks": {
      "type": "array",
      "items": {
        "type": "object",
        "title": "task",
        "properties": {
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
            
        }
      }
    }
  },
"form": [
    {
      "type": "tabarray",
      "items": {
        "type": "section",
        "legend": "Task {{idx}}",
        "items": [
          "tasks[].label",
          "tasks[].type",
          "tasks[].command",
          {
            "type": "array",
            "items": [
              "tasks[].args[]"
            ]
          }
        ]
      }
    },
    {
        "type": "submit",
        "title": "Download tasks.json",       
      }
    
  ],
 "onSubmit": function (errors, values) {
    if (errors) {
      alert('Check the form for invalid values!');
      return;
    }
    // "values" follows the schema, yeepee!
     var json_str = JSON.stringify(values);
    json_with_ver_str = JSON.parse('{"version":"2.0.0",' + json_str.slice(1));
    download("tasks.json",JSON.stringify(json_with_ver_str));
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