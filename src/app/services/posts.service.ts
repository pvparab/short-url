import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PostService{
    constructor(private http:HttpClient){}
    createPost(postData){
        return this.http.post("http://localhost:3000/api/blogpost/create", postData);
    }

    listPost(){
        return this.http.get("http://localhost:3000/api/blogpost/list");
    }

    listProtected(){
        return this.http.get("http://localhost:3000/api/blogpost/list/protected");
    }

    updatePost(postData){
        return this.http.post("http://localhost:3000/api/blogpost/updatepost",postData)
    }

    deletePost(id){
        return this.http.post("http://localhost:3000/api/blogpost/deletepost", id);
    }
}