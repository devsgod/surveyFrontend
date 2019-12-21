import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InviteComponent implements OnInit {

  //table
  rowsFilter = [];
  temp = [];
  columns = [
      { prop: 'name' },
      { name: 'Company' },
      { name: 'Gender' }
  ];

  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  @ViewChild('myTable', { static: true }) tableExp: any;

  // TOASTER
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
      positionClass: 'toast-bottom-right',
      showCloseButton: true
  });

  //custom
  public resData: any = {};

    //table
    public sendData: any = {};
    public userPollData: Array<any> = [];
    public userPollSelected: any = {};
    public userDelIndex: number = 0;

    //responsers
    public selPollResMembers: any = {};
    public pollResNumber: number = 0;
    

  constructor(public toasterService: ToasterService, private api: ApiService) { 
    this.toaster = {
      type: 'success',
      title: 'Title',
      text: 'Message'
    };

    this.sendData.user_id = localStorage.getItem("user_id");

    this.api.sendApiRequest('polls/userpolldata',this.sendData)
      .subscribe(data => {
          // console.log(data);
          this.resData = data;
          if (data != null){
              this.resData = this.resData.data.data;
              console.log(this.resData);
              var i = 0;
              for (i=0; i<this.resData.length; i++){
                  this.userPollData.push({
                      poll_id:this.resData[i].poll_id,
                      title:this.resData[i].poll_title,
                      description:this.resData[i].poll_description,
                      poll_answers:this.resData[i].poll_answers,
                      date:this.resData[i].poll_date_created,
                      poll_status:this.resData[i].poll_status,
                      poll_response:this.resData[i].user_response,
                      poll_answerType:this.resData[i].poll_answertype
                  });
              }
              this.temp = this.userPollData;
              this.rowsFilter = this.userPollData;
          }
      });


  }

  ngOnInit() {
    this.selPollResMembers = "";
  }

  public updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
        return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rowsFilter = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  public onActivate(event){
    if (event.type == "click"){
      this.userPollSelected = event.row;
      //get seleted number
      this.userDelIndex = this.userPollData.indexOf(this.userPollSelected);
      console.log(this.userDelIndex);
      console.log(this.userPollSelected);
      this.selPollResMembers = this.userPollSelected.poll_response;
      // console.log(this.selPollResMembers);
      if (this.selPollResMembers != undefined){
        this.pollResNumber = this.selPollResMembers.length;
        console.log(this.pollResNumber);
        console.log(this.userPollSelected.poll_answers.option1);
        
        var i = 0;
        for (i=0; i<this.pollResNumber; i++){
          if (this.selPollResMembers[i].answer == "option1"){
            console.log(this.selPollResMembers[i]);            
            this.selPollResMembers[i].user_answer = this.userPollSelected.poll_answers.option1;
          } else if (this.selPollResMembers[i].answer == "option2"){
            this.selPollResMembers[i].user_answer = this.userPollSelected.poll_answers.option2;
          } else {
            this.selPollResMembers[i].user_answer = "I don't understand";

          }
        }
      } else {
        this.pollResNumber = 0;
      }
      
    }
  }

}
