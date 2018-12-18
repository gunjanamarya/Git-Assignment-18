import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { HistoryComponent } from './components/history/history.component';
import { LoginGuard } from './guards/login.guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
    { path: 'cart', component: CartComponent, canActivate: [LoginGuard] },
    { path: 'history', component: HistoryComponent, canActivate: [LoginGuard] },
    {
        path: '', redirectTo: '/login',
        pathMatch: 'full'
    },
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
