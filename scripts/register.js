function validateInput() {
    var nameInput = document.getElementById('name');
    var nameError = document.getElementById('nameError');
    var regex = /^.{3,}$/;

    if (!regex.test(nameInput.value)) {
        nameError.textContent = 'Enter proper name';
    } else {
        nameError.textContent = '';
    }
}

document.getElementById("submit").addEventListener("click", function() {
    var dataArray = [];
    var name = document.getElementById("name").value;
    var selectedProfile = document.querySelector('input[name="profile"]:checked')?.value;
    var sal = document.getElementById("salary").value;
    var genderValue = document.querySelector('input[name="gender"]:checked')?.value;
    // var selectedDepartments = [];
    var checkedBoxes = document.querySelectorAll('input[name="dept"]:checked');
    checkedBoxes.forEach(function(checkbox) {
        dataArray.push(checkbox.id); 
    });
    var dates = document.getElementById("date").value;

    var notesVal = document.getElementById("notes").value;

    dataArray.push(name);
    dataArray.push(sal);
    dataArray.push(selectedProfile);
    dataArray.push(genderValue);
    dataArray.push(dates);
    dataArray.push(notesVal);


    console.log(dataArray); 
});

console.log("hofe");