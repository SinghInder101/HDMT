export interface hiringDriveDataInterface {
    drive_admins: []
    node: string
    events: [
        {
            name:string
            date:string
            time:string
            day:string

        }

    ]
    contact_person: [
        {
            name: string
            email: string
            phone_number: string

        }
    ]
    created_by: string
    created_on : string
    description: string
    drive_id: string
    drive_title: string
    type: string
}