$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    function populateForm(user) {
        $('#name').val(user.username);
        $('input[name="profile"][value="' + user.profile + '"]').prop('checked', true);
        $('input[name="gender"][value="' + user.gender + '"]').prop('checked', true);
        user.department.forEach(dept => {
            $('#' + dept).prop('checked', true);
        });
        $('#salary').val(user.salary);
        $('#date').val(user.date);
        $('#notes').val(user.notes);
    }

    if (userId) {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(user => populateForm(user))
            .catch(error => console.error('Error fetching user data:', error));
    }

    $('#employeeForm').submit(function(e) {
        e.preventDefault();
        const formData = {
            // Collect form data
            username: $('#name').val(),
            profile: $('input[name="profile"]:checked').val(),
            gender: $('input[name="gender"]:checked').val(),
            department: $('input[name="dept"]:checked').map(function() { return this.id; }).get(),
            salary: $('#salary').val(),
            date: $('#date').val(),
            notes: $('#notes').val()
        };

        const method = userId ? 'PUT' : 'POST';
        const url = userId ? `http://localhost:3000/users/${userId}` : 'http://localhost:3000/users/';

        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function() {
                alert('User saved successfully');
                window.location.href = 'dashboard.html';
            },
            error: function(xhr, status, error) {
                console.error('Error saving user:', xhr.responseText);
            }
        });
    });
});