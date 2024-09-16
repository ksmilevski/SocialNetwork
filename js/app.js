let session = new Session();
session= session.getSession();
console.log(session+"aa")
if (session!==""){
    console.log(session)
    document.location.href = "home.html";
}



document.querySelector('#registerBtn').addEventListener('click',()=>{
    document.querySelector('.regWindow').style.display='block';
})

document.querySelector('#closeWindow').addEventListener('click',()=>{
    document.querySelector('.regWindow').style.display='none';
})

let config = {
    'usernameRegister':{
        required:true,
        minlength:5,
        maxlength:50
    },
    'emailRegister':{
        required: true,
        email:true,
        minlength: 5,
        maxlength: 50
    },
    'passwordRegister':{
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'repeatPassword'
    },
    'repeatPassword':{
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: "passwordRegister"
    }
};

let validator = new Validator(config,"#registerForm");

document.querySelector("#registerForm").addEventListener('submit',e=>{
    e.preventDefault();

    if (validator.validationPassed()){
        let user=new User();
        user.username=document.querySelector('#usernameRegister').value;
        user.email=document.querySelector('#emailRegister').value;
        user.password=document.querySelector('#passwordRegister').value;
        user.create()
    }else {
        alert("Registration form is not valid!");
    }
})

document.querySelector('#loginForm').addEventListener('submit',e=>{
    e.preventDefault();
    let email=document.querySelector('#loginEmail').value;
    let password=document.querySelector('#loginPassword').value;

    let user=new User();
    user.email=email;
    user.password=password;
    user.login();
})

