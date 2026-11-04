
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  GroupOrdersService,
  GroupParticipant,
} from '@app/services/group-orders/group-orders.service';

@Component({
  selector: 'app-owner-pre-order-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-pre-order-page.component.html',
  styleUrl: './owner-pre-order-page.component.scss',
})
export class OwnerPreOrderPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly groupOrdersService = inject(GroupOrdersService);

  participants: GroupParticipant[] = [];
  groupTotal = 0;

  loading = true;
  error = '';
  groupSubmitted = false;

  ngOnInit(): void {
    const groupReservationId =
      this.route.snapshot.queryParamMap.get('groupReservationId');

    if (!groupReservationId) {
      this.loading = false;
      this.error = 'Missing groupReservationId in URL.';
      return;
    }

    this.groupOrdersService.getGroupSessions(groupReservationId).subscribe({
      next: (response) => {
        this.participants = response.participants;
        this.groupTotal = response.total;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load group order. Check your login and reservation.';
        this.loading = false;
      },
    });
  }

  get canSubmit(): boolean {
    return (
      !this.groupSubmitted &&
      this.participants.length > 0 &&
      this.participants.every((p) => p.isSubmitted)
    );
  }

  submitGroupOrder(): void {
    // Real POST API is not connected yet.
    this.error = 'Group submission is not available yet.';
  }
}
