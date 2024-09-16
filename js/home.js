let session = new Session();
session_id= session.getSession();
if (session_id!==""){


    async function populateuserdata(){
        let user=new User();
        user = await user.get(session_id);

        document.querySelector('#username').innerText=user['username'];
        document.querySelector('#email').innerText=user['email'];

        document.querySelector('#usernameRegister').value=user['username'];
        document.querySelector('#emailRegister').value=user['email'];
    }
    populateuserdata();
}else {
    document.location.href = "index.html";
}

document.querySelector('#logout').addEventListener('click',e=>{
    e.preventDefault();
    session.destroySession();
    document.location.href="/SocialNetwork-main/index.html";
})

document.querySelector('#editAccount').addEventListener('click',()=>{
    document.querySelector('.regWindow').style.display='block';
})

document.querySelector('#closeWindow').addEventListener('click',()=>{
    document.querySelector('.regWindow').style.display='none';
})

document.querySelector('#editForm').addEventListener('submit',e =>{
    e.preventDefault();
    let user=new User();
    user.username=document.querySelector('#usernameRegister').value;
    user.email=document.querySelector('#emailRegister').value;

    user.edit()
});

document.querySelector('#deleteProfile').addEventListener('click',e =>{
    e.preventDefault();
    let text="Are you sure?"
    if (confirm(text)===true){
        let user=new User();
        user.delete()
    }
});

document.querySelector('#postForm').addEventListener('submit',e =>{
    e.preventDefault();
    async function createPost(){
        let content=document.querySelector('#postContent').value;
        let post=new Post();

        post.post_content=content;
        post=await post.create();

        let current_user=new User();
        current_user = await current_user.get(session_id);

        let html= document.querySelector('#allPostsWrapper').innerHTML;
        let delete_post_html='';

        if (session_id===post.user_id){
            delete_post_html='<button class="remove-btn" onclick="removeMyPost(this)">Delete</button>';
        }

        document.querySelector('#allPostsWrapper').innerHTML = `
            <div class="single-post" data-post_id="${post.id}">
                <div class="post-content">${post.content}</div>
                
                <div class="post-actions">
                <p><b>Author: </b>${current_user.username}</p>
                
                <div>
                <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> Likes</button>
                ${delete_post_html}
                
</div>
             
                </div>                
            </div>
        `+html;    }
    createPost();
    document.querySelector('#postContent').value="";

});

async function getAllPosts(){

    let all_posts = new Post();
    all_posts=await all_posts.getAllPosts();
    all_posts.forEach(post=>{
        async function getPostUser(){

            let user=new User();
            user = await user.get(post.user_id);

            let delete_post_html='';

            if (session_id===post.user_id){
                delete_post_html='<button class="remove-btn" onclick="removeMyPost(this)">Delete</button>';
            }

            let html=document.querySelector('#allPostsWrapper').innerHTML;
            document.querySelector('#allPostsWrapper').innerHTML = `
            <div class="single-post" data-post_id="${post.id}">
                <div class="post-content">${post.content}</div>                
                <div class="post-actions">
                <p><b>Author: </b>${user.username}</p>                
                <div>
                <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> Likes</button>
                ${delete_post_html}
                </div>             
                </div>                
            </div>
        `+html;
        }
        getPostUser()
    })
}
getAllPosts();
const removeMyPost = btn => {
    let post_id=btn.closest('.single-post').getAttribute('data-post_id');

    btn.closest('.single-post').remove();

    let post=new Post();
    post.delete(post_id);
}

const likePost = btn => {
    let post_id=btn.closest('.single-post').getAttribute('data-post_id');
    let main_post_el = btn.closest('.single-post');
    let numLikes=parseInt(btn.querySelector('span').innerText);
    btn.querySelector('span').innerText=numLikes+1;

    btn.setAttribute("disabled",true);

    let post=new Post()
    post.like(post_id,numLikes+1);

}