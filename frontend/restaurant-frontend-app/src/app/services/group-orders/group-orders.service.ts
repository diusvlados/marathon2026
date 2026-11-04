
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '@app/shared/config/api-base-url.token';
import { AuthenticationService } from '@app/auth/services/authentication.service';
import { Observable, throwError } from 'rxjs';

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
    private readonly authService = inject(AuthenticationService);

    getGroupSessions(groupReservationId: string): Observable<GroupOrderResponse> {
        const token = this.authService.getTokens()?.idToken;

        if (!token) {
            return throwError(() => new Error('Please sign in to view group orders.'));
        }

        return this.http.get<GroupOrderResponse>(
            `${this.baseUrl}/guest/groups/${encodeURIComponent(groupReservationId)}/sessions`,
            {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`
                })
            }
        );
    }
}
