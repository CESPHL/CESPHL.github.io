email: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    user_level: {
        type: String
    },
    client: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }]