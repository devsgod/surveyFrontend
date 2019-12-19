import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-createpoll',
  templateUrl: './createpoll.component.html',
  styleUrls: ['./createpoll.component.scss']
})
export class CreatepollComponent implements OnInit {

  // TOASTER
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
      positionClass: 'toast-bottom-right',
      showCloseButton: true
  });

  public newPollData: any = {};
  public titleEmpty_isHidden: Boolean = true;
  public descriptionEmpty_isHidden: Boolean = true;
  public option1Empty_isHidden: Boolean = true;
  public option2Empty_isHidden: Boolean = true;
  public option_isHidden: Boolean = true;

  public resData: any = {};

  constructor(public toasterService: ToasterService, private api: ApiService) { 
    this.toaster = {
      type: 'success',
      title: 'Title',
      text: 'Message'
    };
  }

  ngOnInit() {
    this.newPollData.answerType = "default"
    this.newPollData.option1 = "Yes";
    this.newPollData.option2 = "No";
  }

  pop() {
    if (this.newPollData.title == "" || this.newPollData.title == undefined){
      this.titleEmpty_isHidden = false;
      this.descriptionEmpty_isHidden = true;
      return;
    }
    this.titleEmpty_isHidden = true;

    if (this.newPollData.description == "" || this.newPollData.description == undefined){
      this.descriptionEmpty_isHidden = false;
      return;
    }
    this.descriptionEmpty_isHidden = true;

    if (this.newPollData.answerType == "custom"){

      if (this.newPollData.option1 == "" || this.newPollData.option1 == undefined){
        this.option1Empty_isHidden = false;
        return;
      }
      this.option1Empty_isHidden = true;

      if (this.newPollData.option2 == "" || this.newPollData.option2 == undefined){
        this.option2Empty_isHidden = false;
        return;
      }
      this.option2Empty_isHidden = true;
    }
    this.newPollData.dateCreated = new Date().toUTCString();
    console.log(this.newPollData);

    this.api.sendApiRequest('polls/create',this.newPollData)
            .subscribe(data => {
                console.log(data);
                this.resData = data;
                if (this.resData.result_code == "311"){
                  this.toasterService.pop("success", "Success", "Poll created Successfully!");
                } else if (this.resData.result_code == "312"){
                  this.toasterService.pop("warning", "Warning", "Poll already existed!");
                }
            });
  }

  public getAnswerType(event){
    this.newPollData.answerType = event.target.value;
    if (this.newPollData.answerType == "default"){
      this.option_isHidden = true;
      this.newPollData.option1 = "Yes";
      this.newPollData.option2 = "No";
    } else if (this.newPollData.answerType == "custom"){
      this.option_isHidden = false;
      this.newPollData.option1 = "";
      this.newPollData.option2 = "";
      this.option1Empty_isHidden = true;
      this.option2Empty_isHidden = true;
    }
  }

  public getTitle(event){
    this.newPollData.title = event.target.value;
  }

  public getDescription(event){
    this.newPollData.description = event.target.value;
  }

  public getOption1(event){
    this.newPollData.option1 = event.target.value;
  }

  public getOption2(event){
    this.newPollData.option2 = event.target.value;
  }






}
