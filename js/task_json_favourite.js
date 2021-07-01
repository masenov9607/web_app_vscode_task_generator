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
            "flag" :  {
            "type": "boolean",
            }
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
                                console.log("New click " + value);
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
                                if (!new_jso_obj.hasOwnProperty('args'))
                                {
                                    new_jso_obj["args"] = [];
                                }
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
                     "key": "flag",
                      "inlinetitle": "Add to json",
                         "onChange": function (evt) {

                            var value = $(evt.target).val();
                            if (value) {
                                var new_jso_obj = JSON.parse(current_task);
                                new_jso_obj["flag"] = (new_jso_obj["flag"] + 1) % 2;
                                console.log("New click "+ new_jso_obj["flag"]);
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
    };

    json_schema["value"] = JSON.parse(current_task);

    $('form').jsonForm(json_schema);

}
