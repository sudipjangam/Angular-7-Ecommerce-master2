import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit {

  all_products:any;
  show_checkout:boolean = false;
  
  constructor(private router:Router, private custermerService:CustomerService) { }
  ngOnInit(): void {
      // Codes here will be executed when your component is initialized
      this.getAllProduct();
  }
  getAllProduct(){
    this.custermerService.allProduct().subscribe((data)=>{
      this.all_products = data
    },error => {
      console.log("Error :",error)
    })
  }
  buyProduct(id:number){
    this.show_checkout= true;
    this.custermerService.quickBuyProduct(id);
    this.router.navigateByUrl('/checkout');
  }
  addTOCart(){
    alert("Added to cart")
  }

}
