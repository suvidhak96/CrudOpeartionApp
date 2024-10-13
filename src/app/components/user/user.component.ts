import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  // users:user[]=[];
  userForm!: FormGroup;
  userData: User[] = [];
  isEdit: boolean = false;
  editUserId: number | null = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.loadUsers();
  }

  // submit data
  onSubmit(): void {
    if (this.isEdit && this.editUserId !== null) {
      this.userService
        .updateUser(this.editUserId, this.userForm.value)
        .subscribe(() => {
          this.toastr.success('User updated Successfully');
          this.loadUsers();
          this.resetForm();
        });
    } else {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.toastr.success('User addedd successfully');

        this.loadUsers();
        this.resetForm();
      });
    }
  }

  // cancel
  onCancel() {
    this.userForm.reset();
    this.isEdit = false;
    this.editUserId = null;
  }

  // get user data
  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.userData = data;
    });
  }

  editUserById(id: number): void {
    this.isEdit = true;
    this.editUserId = id;
    this.userService.getUser(id).subscribe((res) => {
      this.userForm.patchValue({
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        role: res.role,
        status: res.status,
      });
    });
  }

  deleteUserById(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.toastr.success('User deleted successfully');
      this.loadUsers();
      this.userData = this.userData.filter((user) => user.id !== id);
    });
  }


  resetForm(): void {
    this.userForm.reset();
    this.isEdit = false;
    this.editUserId = null;
  }
}
