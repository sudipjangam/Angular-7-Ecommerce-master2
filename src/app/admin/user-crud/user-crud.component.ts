import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/Model/object-model';
declare var $: any;
@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {
  all_user_data: any;
  single_user_data: any;
  addEditUserForm !: FormGroup;
  user_dto!: User;
  user_reg_data: any;
  edit_user_id: any;
  upload_file_name!: string;
  addEditUser: boolean = false;
  add_user: boolean = false;
  edit_user: boolean = false;
  popup_header!: string;
  signInFormValue: any = {}

  constructor(private formBuilder: FormBuilder, private router: Router, private AdminService:AdminService) { }

  ngOnInit(): void {
    this.getAllUser();
    this.addEditUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      age: ['', Validators.required],
      DOB: '',
      email: ['', Validators.required],
      password: ['', Validators.required],
      addline1: ['', Validators.required],
      addline2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      role: ['', Validators.required],
      agreetc: ['', Validators.required],
      aboutyou: ['', Validators.required],
    })
  }
  getAllUser() {
    this.AdminService.allUser().subscribe((data) => {
      this.all_user_data = data;
    }, error => {
      console.log("My Error", error);
    })
  }
  get rf() {
    return this.addEditUserForm.controls;
  }
  addUserPopup() {
    this.add_user = true;
    this.edit_user = false;
    this.popup_header = "Add New User";
    this.addEditUserForm.reset();
  }
  addUser() {
    this.addEditUser = true;
    if (this.addEditUserForm.invalid) {
      alert("Error !! :-) \n\n Please fill all required field" + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      aboutyou: this.user_reg_data.aboutyou,
      agreetc: this.user_reg_data.agreetc,
      age: this.user_reg_data.age,
      address: {
        id: this.user_reg_data.id,
        addline1: this.user_reg_data.addline1,
        addline2: this.user_reg_data.addline2,
        // addline2: this.user_reg_data.addline2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipcode: this.user_reg_data.zipcode,
      },
      DOB: this.user_reg_data.DOB,
      email: this.user_reg_data.email,

      // Rest of your server setup
      gender: this.user_reg_data.gender,
      language: this.user_reg_data.language,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role,
      mobileNumber: this.user_reg_data.mobileNumber
    }
    this.AdminService.addUser(this.user_dto).subscribe(data => {
      this.addEditUserForm.reset();
      this.getAllUser();
      
      this.add_user = false;
    }, error => {
      console.log("Admin Add User Issue", error);
    })
  }
  // Edit user data
  editUserPopup(user_id: any) {
    this.edit_user_id = user_id;
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = "Edit User";
    
    this.AdminService.singleUser(user_id).subscribe(data => {
      this.single_user_data = data;
      this.upload_file_name = this.single_user_data.uploadPhoto;
      this.addEditUserForm.setValue({
        name: this.single_user_data.name,
        email: this.single_user_data.email,
        DOB: this.single_user_data.DOB,
        gender: this.single_user_data.gender,
        language: this.single_user_data.language,
         //address: {
          addline1: this.single_user_data.address.addline1,
          addline2: this.single_user_data.address.addline2,
          city: this.single_user_data.address.city,
          state: this.single_user_data.address.state,
          zipcode: this.single_user_data.address.zipcode,
         //},
        mobileNumber: this.single_user_data.mobileNumber,
        age: this.single_user_data.age,
        agreetc: this.single_user_data.agreetc,
        password: this.single_user_data.password,
        uploadPhoto: '',
        // uploadPhoto: this.single_user_data.uploadPhoto ==""?"":"C:\\fakepath\\"+this.single_user_data.uploadPhoto,
        role: this.single_user_data.role,
        aboutyou: (this.single_user_data.aboutYou==null?this.single_user_data.aboutyou:this.single_user_data.aboutYou)
      })
    },error => {
      console.log("Admin Add User Issue", error);
    });
  }
  updateUser(){
    if (this.addEditUserForm.invalid) {
      alert("Error !! :-) \n\n Please fill all required field" + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      aboutyou: this.user_reg_data.aboutYou,
      agreetc: this.user_reg_data.agreetc,
      age: this.user_reg_data.age,
      address: {
        id: this.user_reg_data.id,
        addline1: this.user_reg_data.addline1,
        addline2: this.user_reg_data.addline2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipcode: this.user_reg_data.zipcode,
      },
      DOB: this.user_reg_data.DOB,
      email: this.user_reg_data.email,

      // Rest of your server setup
      gender: this.user_reg_data.gender,
      language: this.user_reg_data.language,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      uploadPhoto: (this.user_reg_data.uploadPhoto==""?this.upload_file_name:this.user_reg_data.uploadPhoto),
      role: this.user_reg_data.role,
      mobileNumber: this.user_reg_data.mobileNumber
    }
    this.AdminService.editUser(this.edit_user_id,this.user_dto).subscribe(data => {
      
      this.addEditUserForm.reset();
      this.getAllUser();
      this.add_user = false;
    }, error => {
      console.log("Admin Add User Issue", error);
    })
  }
  deleteUser(user_id: any) {
    this.AdminService.deleteUser(user_id).subscribe(data => {
      this.getAllUser();
    }, error => {
      console.log("Admin Add User Issue", error);
    })

  }
}
