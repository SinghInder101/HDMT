import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById("menu-toggle")?.addEventListener('click',function(){
      console.log(document.getElementById("wrapper")?.classList.contains('toggled'))
      document.getElementById("wrapper")?.classList.contains('toggled') ? document.getElementById("wrapper")?.classList.remove('toggled') : document.getElementById("wrapper")?.classList.add('toggled')
    })
    
  }

}
