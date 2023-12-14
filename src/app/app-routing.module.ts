import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'posts/:id', component: PostsComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
