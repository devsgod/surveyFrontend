import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InviteComponent } from './invite/invite.component';

const routes: Routes = [
  { path: '', component: InviteComponent },
];
@NgModule({
  declarations: [InviteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InviteModule { }
