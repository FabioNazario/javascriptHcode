var user = {};


function insertUser(userData){
    
    var userDataRow = document.createElement('tr');
    
    userDataRow.innerHTML = `
    <tr>
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${userData.name}</td>
        <td>${userData.email}</td>
        <td>${userData.admin}</td>
        <td>${userData.birth}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    </tr>
    `;
    
    document.getElementById('table-users').appendChild(userDataRow);
    

}


document.getElementById('form-user-create').addEventListener('submit', e=>{

    event.preventDefault();
    fields = document.querySelectorAll('#form-user-create [name]');
    fields.forEach(field =>{

        if (field.name == 'gender'){
            if (field.checked) user[field.name] = field.value;
    
        }else{
            user[field.name] = field.value;
        }
    })

    insertUser(user);

    console.log (user);

});



