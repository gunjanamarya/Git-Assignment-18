import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/Order.model';
import { products } from '../../../app/app.settings';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
declare var $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [OrderService, LoginService]
})
export class DashboardComponent implements OnInit {

  cart: Cart[] = new Array();
  amount_spent: number = 0;
  id: string;

  constructor(private loginService: LoginService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
    // console.log('dashboard')
    this.id = null;
    let temp = this.loginService.getSessionStorageVar('cart');
    if (temp && temp.length > 0) {
      this.cart = JSON.parse(this.loginService.getSessionStorageVar('cart'));
      this.calculateAmount();
    }
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.orderService.searchOrder(+this.id).subscribe(result => {
        this.cart = JSON.parse(result[0].cart);
        this.calculateAmount();
      })
    }
  }

  add(i) {
    this.cart.push({ "item": products[i].item, "quantity": 1 })
    this.calculateAmount()
  }

  increement(item) {
    let i = this.find(item)
    this.cart[i].quantity++;
    this.calculateAmount()
  }

  decreement(item) {
    let i = this.find(item)
    this.cart[i].quantity--;
    if (this.cart[i].quantity == 0) {
      this.cart.splice(i, 1);
    }
    this.calculateAmount()
  }

  find(item) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].item == item) {
        return i;
      }
    }
    return -1
  }

  displayQuantity(item) {
    let i = this.find(item)
    if (i != -1) {
      return this.cart[i].quantity
    }
    else {
      return null
    }
  }

  findPrice(item) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].item == item) {
        return products[i].price;
      }
    }
  }

  calculateAmount() {
    this.amount_spent = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.amount_spent += (this.cart[i].quantity * this.findPrice(this.cart[i].item))
    }
    this.loginService.clearSessionVar('cart');
    this.loginService.setSessionStorageVar('cart', JSON.stringify(this.cart));
  }

  goToCart() {
    // console.log(this.id)
    if (this.id) {
      this.router.navigate(['/cart'], {
        queryParams: {
          "id": this.id
        }
      })
    } else {
      this.router.navigate(['/cart'])
    }
  }

  resetCart() {
    if (this.id) {
      $('#warningModal').modal('show');
    } else {
      this.clearCart();
    }
  }

  clearCart() {
    this.loginService.clearSessionVar('cart');
    this.cart = [];
    this.amount_spent = 0;
  }

  forceClear() {
    this.clearCart();
    this.id = null;
    $('#warningModal').modal('hide');
    this.router.navigate(['/dashboard'])
  }
}