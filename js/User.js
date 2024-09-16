class User{
    user_id="";
    username="";
    email="";
    password="";
    api_url="https://66e01d862fb67ac16f286327.mockapi.io/"

    create(){
        let data={
            username:this.username,
            email:this.email,
            password:this.password
        }
        data=JSON.stringify(data);
        fetch(this.api_url+'/users',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: data
        }).then(response => response.json())
            .then(data=>{
                let session=new Session();
                session.user_id=data.id;
                session.startSession();
                window.location.href='home.html'
            })
    }

    login(){
        fetch(this.api_url+'/users')
            .then(response => response.json())
            .then(data=>{
                let logedin= 0;
                data.forEach(dbUser=>{
                    if (dbUser.email===this.email && dbUser.password===this.password){
                        let session = new Session();
                        session.user_id=dbUser.id;
                        session.startSession();
                        logedin=1;
                        window.location.href='home.html';
                    }
                });
                if (logedin===0){
                    alert("Wrong email or password!")
                }
            })
    }
    async get(user_id) {
        let api_url = this.api_url + "/users/" + user_id;
        let response = await fetch(api_url);
        let data = await response.json();
        return data;
    }

    edit(){
        let data={
           username:this.username,
            email: this.email
        };
        data = JSON.stringify(data);
        let session=new Session();


        this.session_id = session.getSession();

        fetch(this.api_url+'/users/'+session_id,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:data
        })
            .then(response=>response.json())
            .then(data=>{
                window.location.href='home.html'
            })

    }

    delete(){
        let session=new Session();
        this.session_id = session.getSession();

        fetch(this.api_url+'/users/'+session_id,{
            method:'DELETE'
        })
            .then(response=>response.json())
            .then(data=>{
                let session = new Session();
                session.destroySession();
                window.location.href='home.html';
            });
    }
}