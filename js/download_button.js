function on_button_click() {
    $.get(
        "includes/favourites.inc.php",
        function (response) {
            var jso_obj = {
                "version": "2.0.0",
                "tasks": []
            };
            var i = 0;
            while (response.hasOwnProperty("task_" + i)) {
                var task = JSON.parse(response["task_" + i]);
                var task_name = response["task_name_" + i];

                if (task["flag"] == true) {
                    delete task["flag"];
                    jso_obj["tasks"].push(task);
                }

                i += 1;
            }
            download("tasks.json", JSON.stringify(jso_obj));
        }, 'json'
    );
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
