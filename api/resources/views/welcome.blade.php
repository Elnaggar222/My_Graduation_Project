<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Integrate Bootstrap Datepicker in Laravel </title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.7.14/css/bootstrap-datetimepicker.min.css">
</head>
<body>
   <div class="container mt-5" style="max-width: 450px">
        <h2 class="mb-4">Laravel Bootstrap Datepicker Demo</h2>
        <div class="form-group">
            <div class='input-group date' id='datetimepicker'>
            <input type='text' class="form-control" />
            <span class="input-group-addon">
              <span class="glyphicon glyphicon-calendar"></span>
            </span>
            </div>
        </div>
   </div>
</body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.7.14/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript">
        $(function() {
           $('#datetimepicker').datetimepicker();
        });
    </script>
    <link rel="stylesheet" href="/node_modules/flatpickr/dist/flatpickr.min.css">
    <script src="/node_modules/flatpickr/dist/flatpickr.min.js"></script>
    <input type="text" class="flatpickr" name="date" placeholder="Select a date">
    // Initialize the datepicker widget
flatpickr('.flatpickr', {
    enableTime: true, // Enable time selection
    dateFormat: 'Y-m-d H:i:s', // Set the date format to YYYY-MM-DD HH:MM:SS
});
</html>
