using APIHandler.Entities;
using APIHandler.Models.GroupReservation;
using APIHandler.Models.GuestReservation;
using Amazon.Lambda.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace APIHandler.Services.GroupReservations;

public interface IGroupReservationService
{
    Task<GroupReservation> GetGroupReservationAsync(string groupReservationId);
    Task<GroupReservation> CreateGroupReservationAsync(string reservationId);
    Task UpdateGroupReservationStatusAsync(string groupReservationId, GroupReservationStatus status);
    Task DeleteGroupReservationAsync(string groupReservationId);
    Task<GetGroupReservationResponse> GetGroupReservationByTokenAsync(string token);
    Task CloseGroupReservationAsync(string reservationId);
    Task CreateGroupReservationIfDoesNotExistAsync(
    string userId,
    string reservationId);
    Task<GetGroupInviteTokenResponse> GetGroupReservationInviteTokenAsync(
        string reservationId);

    // Task SubmitGroupOrderAsync(
    //     string userId,
    //     string groupReservationId,
    //     ILambdaContext context);
}
