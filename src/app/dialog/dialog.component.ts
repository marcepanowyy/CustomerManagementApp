import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { DatePipe } from '@angular/common';
import {ApiService} from "../api.service.";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [DatePipe]
})
export class DialogComponent {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"]
  actionButton: String = "Save"

  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private api: ApiService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef: MatDialogRef<DialogComponent>) {
  }

  customerForm !: FormGroup;

  ngOnInit(): void{
    this.customerForm = this.formBuilder.group({

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      vatIdNum: ['', Validators.required],
      address: ['', Validators.required],
      date: [this.datePipe.transform(new Date(), 'dd MMM yyyy')]
    })

    if(this.editData){
      this.actionButton = 'Update'
      this.customerForm.controls['firstName'].setValue(this.editData.firstName);
      this.customerForm.controls['lastName'].setValue(this.editData.lastName);
      this.customerForm.controls['vatIdNum'].setValue(this.editData.vatIdNum);
      this.customerForm.controls['address'].setValue(this.editData.address)
    }

  }

  addCustomer(){

    if(!this.editData){

    if(this.customerForm.valid){
      this.api.postCustomer(this.customerForm.value)
        .subscribe({
          next: (res) => {
            alert("Customer Added Succesfully")
            this.customerForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert(err.message)
          }
        })
    }

  } else {
      this.updateCustomer()
    }

  }

  updateCustomer(){
    this.api.putCustomer(this.customerForm.value, this.editData.id)
      .subscribe({

        next:(res) => {
          alert("Customer updated sucessfully")
          this.customerForm.reset()
          this.dialogRef.close('update')
        },
        error:(err)=>{
          alert(err.message)
        }

      })
  }

  closeDialog(){
    this.dialogRef.close('close')
  }


}


