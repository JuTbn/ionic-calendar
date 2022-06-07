import { CalendarComponent } from 'ionic2-calendar';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements AfterViewInit {
  
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  
  viewTitle: string;
  
  eventDay: string;
  startHour: string;
  endHour: string;
  
  event = {
    title: '',
    startTime: null,
    endTime: null,
    // allDay: true
    allDay: false    
  };
  
  modalReady = false;
  
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(private modalCtrl:  ModalController) { }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
  }
  
  save(){

    let date = new Date(this.eventDay);
    
    this.event.startTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      parseInt(this.startHour[0] + this.startHour[1]),
      parseInt(this.startHour[3] + this.startHour[4])
      )

    this.event.endTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      parseInt(this.endHour[0] + this.endHour[1]),
      parseInt(this.endHour[3] + this.endHour[4])
      )      
        
      this.modalCtrl.dismiss({event: this.event})
  }
      
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  
  // onTimeSelected(ev) {
  //   this.event.startTime = new Date(ev.selectedTime);
  // }
  
  
  
  close(){
    this.modalCtrl.dismiss();
  }
      
}
    