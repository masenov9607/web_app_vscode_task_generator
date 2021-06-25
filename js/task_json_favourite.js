function new_task_form(current_task) {
    var task_name = JSON.parse(current_task)["label"];

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
                "enum": ["shell", "process"]
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
            },

        },
        "form": [
            {
                "type": "fieldset",
                "title": task_name,
                "items": [
       {
                        "key": "label",
                        "onChange": function (evt) {

                            var value = $(evt.target).val();
                            if (value) {
                                var new_jso_obj = JSON.parse(current_task);
                                new_jso_obj["label"] = value;
                                var jso_str = JSON.stringify(new_jso_obj);
                                console.log(jso_str);
                                $.ajax({
                                    type: "POST",
                                    url: "update_task.php",
                                    data: {
                                        task: jso_str,
                                        task_name: task_name
                                    }
                                });

                            }
                        }
                    },
       {
                        "key": "type",
                        "onChange": function (evt) {

                            var value = $(evt.target).val();
                            if (value) {
                                var new_jso_obj = JSON.parse(current_task);
                                new_jso_obj["type"] = value;
                                var jso_str = JSON.stringify(new_jso_obj);
                                console.log(jso_str);
                                $.ajax({
                                    type: "POST",
                                    url: "update_task.php",
                                    data: {
                                        task: jso_str,
                                        task_name: task_name
                                    }
                                });

                            }
                        }
                    },
                    {
                        "key": "command",
                        "onChange": function (evt) {

                            var value = $(evt.target).val();
                            if (value) {
                                var new_jso_obj = JSON.parse(current_task);
                                new_jso_obj["command"] = value;
                                var jso_str = JSON.stringify(new_jso_obj);
                                console.log(jso_str);
                                $.ajax({
                                    type: "POST",
                                    url: "update_task.php",
                                    data: {
                                        task: jso_str,
                                        task_name: task_name
                                    }
                                });

                            }
                        }
                    },
         {
                        "key": "args",
                        "onChange": function (evt) {

                            var value = $(evt.target).val();
                            if (value) {
                                var new_jso_obj = JSON.parse(current_task);
                                console.log("New value" + value);
                                new_jso_obj["args"].push(value);
                                var jso_str = JSON.stringify(new_jso_obj);
                                console.log(jso_str);
                                $.ajax({
                                    type: "POST",
                                    url: "update_task.php",
                                    data: {
                                        task: jso_str,
                                        task_name: task_name
                                    }
                                });

                            }
                        }
                    },
                    {
                        "type": "button",
                        "title": "Delete",
                        "data": task_name,
                        "onClick": function (evt) {
                            var data = $(this).attr("data");
                            evt.preventDefault();
                            $.ajax({
                                type: "POST",
                                url: "delete_task.php",
                                data: {
                                    task_name: data
                                }
                            });

                        }
    }

     ],

    }
  ],
        "onSubmit": function (errors, values) {
            if (errors) {
                alert('Check the form for invalid values!');
                return;
            }
            console.log("Values " + JSON.stringify(values));
            var task_name = values["label"];
            var json_str = JSON.stringify(values);
            $.ajax({
                type: "POST",
                url: "update_task.php",
                data: {
                    task: json_str,
                    task_name: task_name
                }
            });
        }
    };

    json_schema["value"] = JSON.parse(current_task);

    $('form').jsonForm(json_schema);

}
