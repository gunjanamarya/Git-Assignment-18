import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Order, Cart } from '../../models/Order.model';
import { products } from '../../../app/app.settings';
import { OrderService } from '../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router'
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [LoginService, OrderService]
})

export class CartComponent implements OnInit {

  cart: Cart[];
  order: Order;
  amount_spent: number;
  error: string;
  id: string;
  edit: boolean;

  constructor(private loginService: LoginService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // console.log('cart')
    this.id = null;
    this.edit = false;
    this.cart = JSON.parse(this.loginService.getSessionStorageVar('cart'))
    this.calculateAmount();
    // console.log(this.cart);
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.edit = true
    }
  }

  find(item) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].item == item) {
        return i;
      }
    }
    return -1
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
  }

  submit() {
    this.order = {
      // username: this.loginService.getSessionStorageVar('username'),
      cart: this.cart,
      amount_spent: this.amount_spent,
      order_status: 'submitted'
    }
    this.orderService.placeOrder(this.order).subscribe(data => {
      this.loginService.clearSessionVar('cart');
      $('#successModal').modal({ backdrop: 'static', keyboard: false, show: true });
    }, error => {
      this.error = "Sorry !! We can't place your order at the moment. "
    })
  }

  onEdit() {
    let order = {
      cart: this.cart,
      amount_spent: this.amount_spent,
    }
    this.orderService.editOrder(order, this.id).subscribe(data => {
      this.loginService.clearSessionVar('cart');
      $('#successModal').modal({ backdrop: 'static', keyboard: false, show: true });
    }, error => {
      this.error = "Sorry !! We can't edit your order at the moment. "
    })
  }

  cancelEdit() {
    this.loginService.clearSessionVar('cart');
    this.router.navigate(['/history'])
  }

  goToHistory() {
    $('#successModal').modal('hide');
    this.router.navigate(['/history']);
  }

}