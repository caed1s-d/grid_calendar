import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

interface Event {
  title: string;
  start: Date;
  duration: number; // Продолжительность в минутах
}

@Component({
  selector: 'app-calendar-view',
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent {
  weekDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'];
  timeSlots: { start: string }[] = [];
  events: Event[] = [];

  constructor() {
    this.initializeTimeSlots();
    this.initializeEvents();
  }

  initializeTimeSlots() {
    const startHour = 9;
    const endHour = 19;
    const startTime = new Date();
    startTime.setHours(startHour, 0, 0, 0);

    for (let i = 0; i < (endHour - startHour) * 2; i++) {
      const start = new Date(startTime.getTime() + i * 30 * 60000);
      this.timeSlots.push({
        start: start.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    }
  }

  initializeEvents() {
    this.events = [
      {
        title: 'Приёмка квартиры',
        start: new Date(2024, 11, 1, 10),
        duration: 60,
      },
      {
        title: 'Встреча с застройщиком',
        start: new Date(2024, 11, 1, 11),
        duration: 30,
      },
    ];
  }

  isEventAtSlot(day: string, timeSlotStart: string): boolean {
    const date = this.getDateFromDayAndTime(day, timeSlotStart);
    return this.events.some(
      (event) =>
        event.start.getTime() === date.getTime() &&
        event.duration > this.getSlotIndex(timeSlotStart) * 30
    );
  }

  getEventTitle(day: string, timeSlotStart: string): string {
    const date = this.getDateFromDayAndTime(day, timeSlotStart);
    const event = this.events.find(
      (event) => event.start.getTime() === date.getTime()
    );
    return event ? event.title : '';
  }

  getBorderStyle(day: string, timeSlotStart: string): string {
    return this.isEventAtSlot(day, timeSlotStart) ? '1px solid black' : 'none';
  }

  getDateFromDayAndTime(day: string, timeSlotStart: string): Date {
    const date = new Date();
    const dayIndex = this.weekDays.indexOf(day);

    date.setDate(
      date.getDate() +
        ((dayIndex - date.getDay() + (date.getDay() <= dayIndex ? 7 : 0)) % 7)
    );

    const [hourStr] = timeSlotStart.split(':');
    const hour = parseInt(hourStr);

    date.setHours(hour);

    return date;
  }

  getSlotIndex(timeSlotStart: string): number {
    return this.timeSlots.findIndex((slot) => slot.start === timeSlotStart);
  }
}
