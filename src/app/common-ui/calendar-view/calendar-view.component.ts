import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TIMESLOTS } from '../../values';

interface Event {
  title: string;
  startDay: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
  startTime: string;
  duration: number;
  isEmpty?: boolean;
}

@Component({
  selector: 'app-calendar-view',
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent {
  weekDays: any[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  timeSlots: string[] = TIMESLOTS;
  events: Event[] = [];

  constructor() {
    this.initializeEvents();
  }

  private initializeEvents() {
    this.events = [
      {
        title: 'Приёмка квартиры',
        startDay: 'monday',
        startTime: '9:30',
        duration: 120,
      },
      {
        title: 'Встреча с застройщиком',
        startDay: 'tuesday',
        startTime: '9:00',
        duration: 30,
      },
    ];

    this.fillEmptySlots();
  }

  private fillEmptySlots() {
    const filledEvents: Event[] = [];

    for (const day of this.weekDays) {
      let currentSlotIndex = 0;

      while (currentSlotIndex < this.timeSlots.length) {
        const currentSlot = this.timeSlots[currentSlotIndex];
        const event = this.events.find(
          (event) =>
            event.startDay === this.getDayKey(day) &&
            event.startTime === currentSlot
        );

        if (event) {
          filledEvents.push(event);

          const durationInSlots = Math.ceil(event.duration / 30);
          currentSlotIndex += durationInSlots;
        } else {
          filledEvents.push({
            title: '',
            startDay: day,
            startTime: currentSlot,
            duration: 0,
            isEmpty: true,
          });
          currentSlotIndex++;
        }
      }
    }

    this.events = filledEvents;

    console.log(this.events);
  }

  hasEvent(day: string, slot: string): boolean {
    return this.events.some(
      (event) =>
        event.startDay === this.getDayKey(day) &&
        event.startTime === slot &&
        !event.isEmpty
    );
  }

  getEventTitle(day: string, slot: string): string {
    const event = this.events.find(
      (event) =>
        event.startDay === this.getDayKey(day) && event.startTime === slot
    );
    return event ? event.title : '';
  }

  getEventDuration(day: string, slot: string): number {
    const event = this.events.find(
      (event) =>
        event.startDay === this.getDayKey(day) && event.startTime === slot
    );

    return event ? event.duration : 0;
  }

  getGridRowEnd(day: string, slot: string): string {
    const durationInSlots = Math.ceil(this.getEventDuration(day, slot) / 30);
    return `span ${durationInSlots}`;
  }

  getEventColor(day: string, slot: string): string {
    const title = this.getEventTitle(day, slot);
    switch (title) {
      case 'Приёмка квартиры':
        return '#FFCCCB';
      case 'Встреча с застройщиком':
        return '#ADD8E6';
      default:
        return '#FFFFFF';
    }
  }

  getDayKey(dayAbbreviation: string): string {
    const daysMap: any = {
      monday: 'monday',
      tuesday: 'tuesday',
      wednesday: 'wednesday',
      thursday: 'thursday',
      friday: 'friday',
    };
    return daysMap[dayAbbreviation];
  }
}
