import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../models/Post';
import { StudentService } from '../service/Student.service';
import { NgForm } from '@angular/forms';
import { PostService } from '../service/Post.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [MessageService]
})
export class PostsComponent implements OnInit {

  postList : Post[] = []
  studentId : number | undefined;
  post : Post = { title: '', description: '', dateTime: new Date(), studentId: 0};

  constructor(
    private route: ActivatedRoute,
    private service: StudentService,
    private postService: PostService,
    private messageService: MessageService  ) { }

  onSubmitCreate(form : NgForm){
    this.post = form.value;
    this.post.dateTime = new Date(Date.now());
    this.post.studentId = this.studentId!;
    this.postService.savePost(this.post).subscribe(data =>{
      this.postList.push(data);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Post adicionado!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Atenção', detail: 'Algo deu errado' });
    });
    form.resetForm();
  }

  onClickDelete(postId : number){
    this.postService.deletePost(postId).subscribe(data => {
       this.postList = this.postList.filter(post => post.id !== postId)
       this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Post deletado!' });
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.studentId = Number(params.get('id'));
      if (this.studentId) {
        this.service.getStudentPosts(this.studentId).subscribe(data =>
          this.postList = data);
      }
    });
  }
}
