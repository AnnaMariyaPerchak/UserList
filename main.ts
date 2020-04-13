let input = document.forms['inputing'] as HTMLFormElement
let num = 1
let login = input['login'] as HTMLFormElement
let password = input['password'] as HTMLFormElement
let email = input['email'] as HTMLFormElement
let add_user = document.getElementById('add_user') as HTMLInputElement
let edit_user = document.getElementById('edit_user') as HTMLInputElement
let Mytable = document.querySelector('#Table') as HTMLTableElement
let edit = document.getElementById('edit') as HTMLElement
let users = []

class User {
    constructor(private number: number, private login: string, private password: string, private email: string) { }
    getNUmber() {
        return this.number
    }
    getLogin() {
        return this.login
    }
    getPassword() {
        return this.password
    }
    getEmail() {
        return this.email
    }
}

class ModuleTable {
    table: HTMLTableElement;
    tbody: HTMLTableElement;
    constructor() {
        this.table = document.createElement('table');
        this.tbody = <HTMLTableElement><unknown>this.table.createTBody();
    }
    render(user:User) {
        this.tbody.innerHTML += `<th>${user.getNUmber()}</th><td>${user.getLogin()}</td><td>${user.getPassword()}</td><td>${user.getEmail()}</td>
        <td>
                            <button type="button" id="edit" onclick="mytable.Edit(${user.getNUmber() - 1})" class="btn btn-warning">Edit</button>
                        </td>
                        <td>
                            <button type="button" id="delete" onclick="mytable.Delete(${user.getNUmber() - 1})" class="btn btn-danger">Delete</button>
                        </td>`
        return this.tbody
    }
    
    saveEditUser(num:number):void {
        users.splice(num, 1);
        let user = new User(num +1, login.value, password.value, email.value)
        users.splice(num, num-1 , user);
        console.log(num)
        mytable.tbody.innerHTML = ' '
        for (let u = 0; u < users.length; u++) {
            Mytable.append(mytable.render(users[u]))
        }
        input.reset()
        add_user.hidden = false
        edit_user.hidden = true
    }
    Edit(num1:number):void {
        add_user.hidden = true
        edit_user.hidden = false
        for (let i = 0; i < users.length; i++) {
            if (i === num1) {
                console.log(users[i])
                for (let key in users[i]) {
                    if (key == 'login') {
                        login.value = users[i][key]
                    }
                    if (key == 'password') {
                        password.value = users[i][key]
                    }
                    if (key == 'email') {
                        email.value = users[i][key]
                    }
                }
                edit_user.addEventListener('click',function(){
                    mytable.saveEditUser(users[i].number-1)
                    // users[i].saveEditUser()
                })
            }

        }
        // console.log(num1)
    }
    Delete(num:number):void{
        users.splice(num, 1);
        console.log(users)
        mytable.tbody.innerHTML = ' '
        for (let u = 0; u < users.length; u++) {
            if(num<users[u].getNUmber()){
                users[u].number--
            }
            Mytable.append(mytable.render(users[u]))
        }
    }
}

let mytable = new ModuleTable()
mytable.table = Mytable

function addUser() :void{
    let user = new User(num, login.value, password.value, email.value)
    Mytable.append(mytable.render(user))
    num++
    console.log(user)
    users.push(user)
    console.log(users)
    input.reset()
}