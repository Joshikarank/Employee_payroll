$(document).ready(function() {
    $('#submit').on('click', function() {
        var deptArray = [];
        var name = $('#name').val();
        var selectedProfile = $('input[name="profile"]:checked').val(); 
        var sal = $('#salary').val();
        var genderValue = $('input[name="gender"]:checked').val();
        var checkedBoxes = $('input[name="dept"]:checked');
        
        checkedBoxes.each(function() {
            deptArray.push($(this).attr('id'));
        });
        
        var dates = $('#date').val();
        var notesVal = $('#notes').val();

        var datasobject = {
            username: name,
            profile: selectedProfile,
            salary: sal,
            gender: genderValue,
            department: deptArray,
            date: dates,
            notes: notesVal
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/users',
            data: JSON.stringify(datasobject),
            contentType: 'application/json',

        });
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

document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('employeeForm').reset();
});