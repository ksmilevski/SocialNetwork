class Post{
    post_id="";
    post_content="";
    user_id="";
    likes="";
    api_url="https://66e01d862fb67ac16f286327.mockapi.io/"

    async create(){
        let session=new Session();
        this.session_id=session.getSession();

        let data={
            user_id:session_id,
            content:this.post_content,
            likes:0
        }

        data=JSON.stringify(data);

        let response = fetch(this.api_url+'/posts',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: data
        });
        data=(await response).json();

        return data;
    }

    async getAllPosts(){
        let response = fetch(this.api_url+'/posts');
        let data=(await response).json();

        return data;
    }
    like(postid,likes){
        let data={
            likes: likes
        }

        data=JSON.stringify(data)

        fetch(this.api_url+'/posts/'+postid,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response=>response.json())
            .then(data=>{
                alert("Post liked!")
            });
    }
    delete(postid){
        fetch(this.api_url+'/posts/'+postid,{
            method:'DELETE'
        })
            .then(response=>response.json())
            .then(data=>{
                alert("Post deleted.")
            });

    }

}