import { Component, OnInit } from '@angular/core';
import { listPanelist } from 'src/Interfaces/listPanelist.interface';
import { managePanelistService } from '../Services/managePanelist.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-manage-panelist',
  templateUrl: './manage-panelist.component.html',
  styleUrls: ['./manage-panelist.component.css']
})
export class ManagePanelistComponent implements OnInit {


  panelistData!: listPanelist[]



  constructor(private managePanelistService:managePanelistService) {

    // person_name:string
    // drive_id:string
    // email: string
    // availability:Array<object>

    this.panelistData =[{
      person_name:"",
      drive_id:"",
      email:"",
      availability: [
        {
          'xys':'ss'
        }
      ]
    }


   ]

  }

  ngOnInit(): void {
    console.log('hi')

    this.managePanelistService.listPanelist().subscribe(
      data => {
        if(data.success == false){

        }
        else {
          this.panelistData = data.data;
          console.log(this.panelistData)
        }
      }
    )




  }

}
