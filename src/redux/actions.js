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
