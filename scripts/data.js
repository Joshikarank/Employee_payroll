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
            <td><img src="${user.profile}" alt="Profile" width="50"></td>
            <td>${user.username}</td>
            <td>${user.salary}</td>
            <td>${user.gender}</td>
            <td class="dept">${createdeptelement(user.department)}</td>            
            <td>${user.date}</td>
            <td>${user.notes}</td>
            <td>
                <a href="register.html?id=${user.id}" class="edits" title="edit this user"><i class="fa-solid fa-pen"></i></a>
                <button class="deletebutton" data-id="${user.id}" title="delete this user"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        return row;
    }

    fetchUsers();

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    
    if (userId) {
        $('#submit').text('Update');
    }
    
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
        
        $("#searchInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#userData tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });
    });
});
function createdeptelement(department) {
    return department.map(de => `<span class="dt">${de}</span>`).join(' ');
}