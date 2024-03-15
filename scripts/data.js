document.addEventListener('DOMContentLoaded', () => {
    function fetchUsers() {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => {
                const userData = document.getElementById('userData');
                userData.innerHTML = ''; // Clear existing rows before appending

                data.forEach(user => {
                    const row = createRow(user);
                    userData.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function createRow(user) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td><img src="${user.profile}" alt="Profile" width="50"></td>
            <td>${user.username}</td>
            <td>${user.salary}</td>
            <td>${user.gender}</td>
            <td>${user.department.join(', ')}</td>
            <td>${user.date}</td>
            <td>${user.notes}</td>
            <td>
                <button class="edits"><i class="fa-solid fa-pen"></i></button>
                <button class="deletebutton" data-id="${user.id}"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        return row;
    }

    fetchUsers();

    $(document).ready(function() {
        $('#userData').on('click', '.deletebutton', function() {
            const idToDelete = $(this).data('id');
            if (idToDelete) {
                const confirmDelete = confirm('Are you sure you want to delete this row?');
                if (confirmDelete) {
                    deleteRow(idToDelete, $(this));
                }
            } else {
                console.error('Invalid data-id attribute for delete button');
            }
        });
    
        function deleteRow(id, buttonElement) {
            $.ajax({
                url: `http://localhost:3000/users/${id}`,
                type: 'DELETE',
                success: function() {
                    console.log('User deleted successfully');
                    buttonElement.closest('tr').remove();
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting user:', xhr.responseText);
                }
            });
        }
    });
});