import { Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-bate-papo',
  templateUrl: './dialog-bate-papo.component.html',
  styleUrls: ['./dialog-bate-papo.component.css']
})
export class DialogBatePapoComponent implements OnInit {

  constructor (public dialogRef: MatDialogRef<DialogBatePapoComponent>) {

  }; 

  ngOnInit() {
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
