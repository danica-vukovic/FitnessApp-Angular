import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentRequest } from '../../../models/comment-request';
import { CommentService } from '../../services/comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../auth/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProgramService } from '../../services/program.service';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  comments: Comment[] = [];
  commentForm: FormGroup = new FormGroup({});;
  public idUser: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { programId: number} ,
    private commentService: CommentService, private snackBar: MatSnackBar, private authService: AuthService, private programService: ProgramService,
    private fb: FormBuilder
  ) {
    const id=authService.getUser()?.idUser;
    if(id != undefined) this.idUser=id;
    
  }
  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content: [null, Validators.required],
    });
    this.loadComments();
  }


  loadComments(): void {
    this.programService.getComments(this.data.programId).subscribe(
      (data: any[]) => {
        this.comments = data.map(item => ({
          username: item.user.username, 
          dateTime: item.dateTime, 
          content: item.content 
        }));
        console.log(this.comments);
      },
      (error: any) => {
        this.snackBar.open('Error loading comments', error, {
          duration: 4000,
        });
      }
    );
  }
  cancel(): void {
    this.dialogRef.close();
  }

  addComment(): void {
    const commentRequest: CommentRequest = {
      content: this.commentForm.value.content,
      userId: this.idUser,
      programId: this.data.programId,
    };
    console.log(commentRequest);
    this.commentService.addComment(commentRequest).subscribe({
      next: (data) => {
        this.loadComments();
        this.commentForm.reset();
      },
      error: () =>
        this.snackBar.open('An error occured!', undefined, { duration: 2000 }),
      complete: () => {
        this.snackBar.open('Comment added sucessfully!', undefined, {
          duration: 4000,
        });
      },
    });
  }
}
