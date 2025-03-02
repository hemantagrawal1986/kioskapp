export default function ReserveReducer(appointmentReserve,action)
{
    switch(action.type)
    {
        case "attendee.selected":
        {
            return {
                ...appointmentReserve,
                attendee:{
                    ...action.attendee
                }
            }
        }

        case "attendee.changed":
        {
            return {
                ...attendeeActive,
                ...action.attendee
            }
        }

       

    }
}