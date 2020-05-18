let nextParticipantId = 0

export const addParticipant = participant => ({
  type: 'ADD_PARTICIPANT',
  participantId: nextParticipantId++,
  name: participant.name,
  email: participant.email,
  phone: participant.phone
})

export function loadData() {
  return { type: 'LOAD_DATA' };
}

export function deleteParticipant(participantId) {
  return {
    type: 'DELETE_PARTICIPANT',
    participantId
  }
}

export function updateParticipant(participant) {
  return {
    type: 'UPDATE_PARTICIPANT',
    participant
  }
}