import {Component, OnInit} from '@angular/core';
import {DialogComponent} from "./dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "./api.service.";
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  title = 'CustomerManagementApp';

  displayedColumns: string[] = ['firstName', 'lastName', 'vatIdNum', 'address', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
              private api: ApiService) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '35%'
    }).afterClosed().subscribe(value => {
      if(value === 'save'){
        this.getAllCustomers();
      }
    })

  }

  getAllCustomers(){
    this.api.getCustomer().subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        console.log(res)
      },
      error: (err) =>{
        alert(err)
      }
    })
  }

  ngOnInit(): void {
    this.getAllCustomers()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCustomer(row: any){

    this.dialog.open(DialogComponent,{
      width: '35%',
      data: row
    }).afterClosed().subscribe(value => {
      if(value === 'update'){
        this.getAllCustomers()
       }
      }
    )
  }

  deleteCustomer(id: number){
    this.api.deleteCustomer(id).subscribe({
      next:(res)=>{
        alert("Customer deleted succesfully");
        this.getAllCustomers();
      },
      error:(err)=>
        alert(err.message)
    })
  }


}
