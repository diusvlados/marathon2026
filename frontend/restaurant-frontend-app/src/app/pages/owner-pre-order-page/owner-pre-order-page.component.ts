
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Participant {
  id: string;
  name: string;
  submitted: boolean;
  items: OrderItem[];
}

@Component({
  selector: 'app-owner-pre-order-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-pre-order-page.component.html',
  styleUrl: './owner-pre-order-page.component.scss',
})
export class OwnerPreOrderPageComponent {
  participants: Participant[] = [
    {
      id: '1',
      name: 'Owner',
      submitted: true,
      items: [
        { name: 'Margherita Pizza', price: 250, quantity: 2 },
      ],
    },
    {
      id: '2',
      name: 'Andrii',
      submitted: true,
      items: [
        { name: 'Caesar Salad', price: 180, quantity: 1 },
        { name: 'Pasta', price: 220, quantity: 2 },
      ],
    },
    {
      id: '3',
      name: 'Max',
      submitted: true,
      items: [{ name: 'Burger', price: 210, quantity: 1 }],
    },
  ];

  groupSubmitted = false;

  participantTotal(participant: Participant): number {
    return participant.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  get groupTotal(): number {
    return this.participants.reduce(
      (sum, participant) => sum + this.participantTotal(participant),
      0
    );
  }

  get canSubmit(): boolean {
    return (
      !this.groupSubmitted &&
      this.participants.length > 0 &&
      this.participants.every((participant) => participant.submitted)
    );
  }

  submitGroupOrder(): void {
    if (!this.canSubmit) return;
    this.groupSubmitted = true;
  }
}
