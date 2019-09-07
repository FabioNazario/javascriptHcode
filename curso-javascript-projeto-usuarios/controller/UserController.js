class UserController{

    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        console.log(document);

        this.onSubmit();

    }

    addUser(user){
        var userRow = document.createElement('tr');
    
        userRow.innerHTML =`
        <td><img src="${user.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.admin ? 'Sim':'Não'}</td>
        <td>${user.birth}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>`;
    
        this.tableEl.appendChild(userRow);
    }
    

    onSubmit(){

        this.formEl.addEventListener('submit', event =>{
            event.preventDefault();
            let values = this.getValues();

            this.getPhoto().then(
                (content) => {
                    values.photo = content;
                    this.addUser(values);
                } ,
                (e) =>{
                    console.error(e);
                }
            );
        });

    }

    getPhoto(){

        return new Promise((resolve, reject) => { 

            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item=>{

                if (item.name == 'photo'){
                    return item;
                }

            });

            console.log(elements[0].files[0]);

            let file = elements[0].files[0];

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (e) => {
                reject(e);
            };
            if(file){
                fileReader.readAsDataURL(file);
            }else{
                resolve('dist/img/boxed-bg.jpg');
            }
        });
    }

    getValues(){

        let user = {};

        [...this.formEl.elements].forEach(function (field, index){
        
                if (field.name == 'gender'){
                    if (field.checked) user[field.name] = field.value;
            
                }else if(field.name == 'admin'){
                    user[field.name] = field.checked;
                }else{
                    user[field.name] = field.value;
                }
            });
        
            return new User(
                 user.name
                ,user.gender
                ,user.birth
                ,user.country
                ,user.email
                ,user.password
                ,user.photo
                ,user.admin
            )

            event.preventDefault();

            return objectUser;

    }


}