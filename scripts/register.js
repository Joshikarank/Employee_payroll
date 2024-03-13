$(document).ready(function() {
    $('#submit').on('click', function() {
        var dataArray = [];
        var name = $('#name').val();
        var selectedProfile = $('input[name="profile"]:checked').val();
        var sal = $('#salary').val();
        var genderValue = $('input[name="gender"]:checked').val();
        var checkedBoxes = $('input[name="dept"]:checked');
        checkedBoxes.each(function() {
            dataArray.push($(this).attr('id'));
        });
        var dates = $('#date').val();
        var notesVal = $('#notes').val();

        dataArray.push(name);
        dataArray.push(sal);
        dataArray.push(selectedProfile);
        dataArray.push(genderValue);
        dataArray.push(dates);
        dataArray.push(notesVal);

        console.log(dataArray);
        // You can perform further actions with the dataArray here, like sending it to a server via AJAX
    });

    $('#name').on('input', function() {
        var nameInput = $(this).val();
        var regex = /^.{3,}$/;
        var nameError = $('#nameError');
        if (!regex.test(nameInput)) {
            nameError.text('Enter proper name');
        } else {
            nameError.text('');
        }
    });
});