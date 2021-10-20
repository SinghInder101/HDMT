import { Component } from '@angular/core';
import {authService} from './Services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[authService]
})
export class AppComponent {
  title = 'hiring-drive-management-tool';
}
