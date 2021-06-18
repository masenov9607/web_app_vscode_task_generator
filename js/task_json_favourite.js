function new_task_form(current_task){
var json_schema = {
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
    {
    "type": "advancedfieldset",
    "title": JSON.parse(current_task)["label"],
    "items": [
       "label",
       "type",
       "command",
        "args",
         {
        "type": "submit",
        "title": "Update",       
    },
    {
        "type": "button",
        "title": "Delete",       
    }
    
     ],
        
    }
  ],
 "onSubmit": function (errors, values) {
    if (errors) {
      alert('Check the form for invalid values!');
      return;
    }
    var task_name = values["label"];
    var json_str = JSON.stringify(values);
    $.ajax({
    type: "POST",
    url: "submission.php",
    data: {
    task: json_str,
    task_name: task_name
    }});
    }
};
    
json_schema["value"] = JSON.parse(current_task);

$('form').jsonForm(json_schema);

}
