import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalModalPage } from '../../pages/cal-modal/cal-modal.page';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  eventSource = [];

  viewTitle: string;

  calendar = {
    mode: 'month',
    curentDate: new Date(),
  };
  
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.createRandomEvents();
   }

  ngOnInit(): void {
  }

  next() {
    this.myCal.slideNext();
  }

  back(){
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  createRandomEvents() {
    let events = [];
    for (var i = 0; i < 50; i += 1) {
      let date = new Date();
      let eventType = Math.floor(Math.random() * 2);
      let startDay = Math.floor(Math.random() * 90) - 45;
      let endDay = Math.floor(Math.random() * 2) + startDay;
      let startTime;
      let endTime;
      
      let startMinute = Math.floor(Math.random() * 24 * 60);
      let endMinute = Math.floor(Math.random() * 180) + startMinute;
      startTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + startDay,
        0,
        date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
          );


          events.push({
            title: 'Event - ' + i,
            startTime: startTime,
            endTime: endTime,
            allDay: false,
          });          
        }
        this.eventSource = events;
      }



  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: true
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        
        let event = result.data.event;
        this.eventSource.push(result.data.event);

        
        this.myCal.loadEvents();
      }
    });
  }

}
