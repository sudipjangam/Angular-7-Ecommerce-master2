import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
   user_dashboard_data:any;
   total_user:number = 0;
   admin_user:number = 0;
   seller_user:number = 0;
   buyer_user:number = 0;

   product_dashboard_data:any;
   total_product:number = 0;
   published_product:number = 0;
   inactive_product:number = 0;
   draft_product:number = 0;
  constructor(private router:Router,private adminService:AdminService) { }
  ngOnInit(): void {
    this.adminUserDataDashboard();
    this.adminProductDashboard();

  }
  userDashboard(){

  this.router.navigateByUrl('/admin/user');
  }
  productDashboard(){
    this.router.navigateByUrl('/admin/product');
  }
  adminUserDataDashboard(){
    this.adminService.userDashBoardData().subscribe(data=>{
      this.user_dashboard_data= data;
      console.log(this.user_dashboard_data);
      for(let user=0;user<this.user_dashboard_data.length;user++){
        if(this.user_dashboard_data[user].role == "admin"){
          ++this.admin_user;
        } else if(this.user_dashboard_data[user].role == "buyer"){
          ++this.buyer_user;
        } else if(this.user_dashboard_data[user].role == "seller"){
          ++this.seller_user;
        }
        ++this.total_user;
      }
    },error=>{
      console.log(error);
    })
  }

  adminProductDashboard(){
    this.adminService.productDashBoardData().subscribe(data=>{
      this.product_dashboard_data = data;
      console.log(this.product_dashboard_data);
      for(let product=0;product<this.product_dashboard_data.length;product++){
        if(this.product_dashboard_data[product].status == "In stock"){
          ++this.published_product;
        } else if(this.product_dashboard_data[product].status == "Draft"){
          ++this.draft_product;
        } else if(this.product_dashboard_data[product].status == "Out of stock"){
          ++this.inactive_product;
        }
        ++this.total_product;
      }
    },error=>{
      console.log(error);
    })

  }
}
