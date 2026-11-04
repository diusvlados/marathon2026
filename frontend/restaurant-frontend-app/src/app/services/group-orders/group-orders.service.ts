
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '@app/shared/config/api-base-url.token';
import { Observable } from 'rxjs';

export interface GroupOrderItem {
    dish: {
    id: string;
    name: string;
    price: number;
    };
    quantity: number;
}

export interface GroupParticipant {
    id: string;
    type: string | number;
    name: string;
    items: GroupOrderItem[];
    total: number;
    isSubmitted: boolean;
}

export interface GroupOrderResponse {
    participants: GroupParticipant[];
    total: number;
}

@Injectable({ providedIn: 'root' })
    export class GroupOrdersService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = inject(API_BASE_URL);

    getGroupSessions(groupReservationId: string): Observable<GroupOrderResponse> {
    return this.http.get<GroupOrderResponse>(
    `${this.baseUrl}/guest/groups/${encodeURIComponent(groupReservationId)}/sessions`
    );
    }
}
