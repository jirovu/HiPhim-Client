import { Component, OnInit, ElementRef } from '@angular/core';
import { RestapiService } from '../services/restapi/restapi.service';

@Component({
  selector: 'app-hera',
  templateUrl: './hera.component.html',
  styleUrls: ['./hera.component.css']
})
export class HeraComponent implements OnInit {
  isToggle: boolean = false;
  isRight: boolean = true;
  message: string;
  conversation: Array<Map<String, String>> = [];
  heraResponse: string;

  constructor(private restApi: RestapiService) { }

  ngOnInit() {
  }

  toggleHera() {
    this.isToggle = !this.isToggle;
  }

  onSend() {
    this.isRight = !this.isRight;
    this.restApi.getAns(this.message).subscribe(res => {
      this.heraResponse = res;
      this.conversation.push();
      let map = new Map<String, String>();
      map.set("left", this.message);
      map.set("right", this.heraResponse);
      this.conversation.push(map);
      console.log(this.conversation);
      this.message = "";
    });
  }
}
