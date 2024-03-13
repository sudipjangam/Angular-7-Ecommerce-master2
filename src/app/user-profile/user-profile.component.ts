import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../core/Model/object-model';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userProfileForm!:FormGroup;
  userProfile :boolean = false;
  user_id:any;
  user_data:any;
  user_update_data:any;
  user_dto!:User;
  user_profile_pic:any;
  user_role:any;
  user_language:any;

 constructor(private formBuilder:FormBuilder,private router:Router,private userservice:UserService){}
 ngOnInit(): void {
  this.user_id = sessionStorage.getItem('user_session_id');
  this.userProfileForm = this.formBuilder.group({
    name :['', Validators.required],
    mobileNumber :['', Validators.required],
    age :['', Validators.required],
    DOB :['', Validators.required],
    email :['', Validators.required],
    password :['', Validators.required],
    addline1 :['', Validators.required],
    addline2 :[],
    city :['', Validators.required],
    state :['', Validators.required],
    zipcode :['', Validators.required],
    language :['', Validators.required],
    gender :['', Validators.required],
    uploadPhoto :['', Validators.required],
    role :[],
    agreetc :[],
    aboutyou:['', Validators.required],
  });  
  this.editUserData(this.user_id);  
 }
 get rf(){
     return this.userProfileForm.controls;
 }
 editUserData(user_id:any){
  this.userservice.getUserData(user_id).subscribe((data)=>{
    debugger;
    this.user_data = data;
    this.user_profile_pic = this.user_data.uploadPhoto;
    this.user_language = this.user_data.language;
    this.user_role = this.user_data.role;
    this.userProfileForm.setValue({
      name : this.user_data.name,
      mobileNumber : this.user_data.mobileNumber,
      age : this.user_data.age,
      DOB : this.user_data.DOB,
      email : this.user_data.email,
      password : this.user_data.password,
      addline1 : this.user_data.address.addline1,
      addline2 : this.user_data.address.addline2,
      city : this.user_data.address.city,
      state : this.user_data.address.state,
      zipcode : this.user_data.address.zipcode,
      language : this.user_data.language,
      gender : this.user_data.gender,
      uploadPhoto : this.user_data.uploadPhoto,
      role : this.user_data.role,
      agreetc : this.user_data.agreetc,
      aboutyou : this.user_data.aboutyou
    })
  },error => console.log(error)
  );
 }
 updateProfile(){
  debugger;
  this.userProfile = true;
  // if(this.userProfileForm.invalid){
  //   return;
  // }
  // debugger;
  this.user_update_data = this.userProfileForm.value;
  this.user_dto = {
    aboutyou:this.user_update_data.aboutyou,
    agreetc:this.user_update_data.agreetc,
    age:this.user_update_data.age,
    address:{
      id: this.user_update_data.id,
      addline1:this.user_update_data.addline1,
      addline2:this.user_update_data.addline2,
      city:this.user_update_data.city,
      state:this.user_update_data.state,
      zipcode:this.user_update_data.zipcode,
    },
    DOB:this.user_update_data.DOB,
    email:this.user_update_data.email,

    // Rest of your server setup
    gender:this.user_update_data.gender,
    language:this.user_update_data.language,
    name:this.user_update_data.name,
    password:this.user_update_data.password,
    uploadPhoto:(this.user_update_data.uploadPhoto ==""?this.user_profile_pic:this.user_update_data.uploadPhoto),
    // uploadPhoto:this.user_update_data.uploadPhoto,
    role:this.user_update_data.role,
    mobileNumber:this.user_update_data.mobileNumber

  }
  this.userservice.updateUserData(this.user_id,this.user_dto).subscribe(data=>{
    alert("Profile Updated Successfully");
    console.log(data);
    if(this.user_role =='admin'){
      this.router.navigateByUrl('/admin-dashboard');
    }else if(this.user_role =='user'){
      this.router.navigateByUrl('/user-dashboard');
    }else if(this.user_role =='seller'){
      this.router.navigateByUrl('/seller-dashboard');
    }else if(this.user_role =='buyer'){
      this.router.navigateByUrl('/buyer-dashboard');
    }
    this.userProfile = false;
  }, error =>{
    console.log('Error',error);
  })
}
}
