import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserCrudComponent } from '../../admin/user-crud/user-crud.component';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [RouterLink,CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,UserCrudComponent],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})
export class SigninSignupComponent {
  regForm : boolean = false;
  signUpForm!:FormGroup;
  signInForm!:FormGroup;
  signupSubmitted = false;
  href:string = '';
  user_data:any;
  user_dto!:User;
  user_reg_data:any;
  signInFormValues:any = {};

  constructor(private formBuilder:FormBuilder,private router:Router, private loginService:LoginSignupService){

  }
  ngOnInit():void{
    this.href= this.router.url;
    if(this.href == '/sign-up'){
      this.regForm = true;
    }else if(this.href == '/sign-in'){
      this.regForm = false;
    }
    this.signUpForm = this.formBuilder.group({
      name :['', Validators.required],
      mobileNumber :['', Validators.required],
      age :['', Validators.required],
      DOB :['', Validators.required],
      email :['', Validators.required],
      password :['', Validators.required],
      addline1 :['', Validators.required],
      addline2 :['', Validators.required],
      city :['', Validators.required],
      state :['', Validators.required],
      zipcode :['', Validators.required],
      language :['', Validators.required],
      gender :['', Validators.required],
      uploadPhoto :['', Validators.required],
      role :['', Validators.required],
      agreetc :['', Validators.required],
      aboutyou:['', Validators.required],

    });
  }
  get rf(){
      return this.signUpForm.controls;
  }
  onSubmitSignUp(){
    this.signupSubmitted = true;
    if(this.signUpForm.invalid){
      alert("Please fill all the fields");
      return;
    }
    this.user_reg_data = this.signUpForm.value;
    this.user_dto = {
      aboutyou:this.user_reg_data.aboutyou,
      agreetc:this.user_reg_data.agreetc,
      age:this.user_reg_data.age,
      address:{
        id: this.user_reg_data.id,
        addline1:this.user_reg_data.addline1,
        addline2:this.user_reg_data.addline2,
        city:this.user_reg_data.city,
        state:this.user_reg_data.state,
        zipcode:this.user_reg_data.zipcode,
      },
      DOB:this.user_reg_data.DOB,
      email:this.user_reg_data.email,

      // Rest of your server setup
      gender:this.user_reg_data.gender,
      language:this.user_reg_data.language,
      name:this.user_reg_data.name,
      password:this.user_reg_data.password,
      uploadPhoto:this.user_reg_data.uploadPhoto,
      role:this.user_reg_data.role,
      mobileNumber:this.user_reg_data.mobileNumber

    }
    this.loginService.userRegister(this.user_dto).subscribe(data=>{
      debugger;
      console.log(data);
      alert("user registered successfully");
      this.router.navigateByUrl('/sign-in');
    })
  }
  onsubmitSignin(){
  this.loginService.authLogin(this.signInFormValues.useremail, this.signInFormValues.userpassword).subscribe(data=>{
    console.log(data);
    this.user_data = data;
    if(this.user_data.length == 1){
    for(let i=0;i<this.user_data.length;i++){
      if(this.user_data[i].role == "seller"){
        sessionStorage.setItem("user_session_id",this.user_data[0].id);
        sessionStorage.setItem("role",this.user_data[0].role);
        this.router.navigateByUrl('/seller-dashboard');
      }else if(this.user_data[i].role == "buyer"){
        sessionStorage.setItem("user_session_id",this.user_data[0].id);
        sessionStorage.setItem("role",this.user_data[0].role);
        this.router.navigateByUrl('/buyer-dashboard');
      }else{
        alert("something went wrong! , inavlid login details");
      }
    }
  }
    else{
      alert("inavlid details");
    }
    console.log(this.user_data)

    // if(this.user_data.role == 'admin'){
    //   this.router.navigateByUrl('/admin');
    // }else if(this.user_data.role == 'user'){
    //   this.router.navigateByUrl('/user');
    // }

  }, error=>{console.log("Error"+error);})
  }
}
