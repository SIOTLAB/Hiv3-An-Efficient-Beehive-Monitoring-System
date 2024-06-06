const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const memberSchema = new Schema ({
    aemail: { type: String},
    userid: { type: String}
});

const roleObject = new Schema({
    Role: { type: String},
    members: [memberSchema], 
    id: { type: String} 
});

const rolesSchema = new Schema({
    Roles: [roleObject]
});

const ImageSchema = new mongoose.Schema({
    image_name: String,
    data: Buffer
});

const MLResultSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    bee_in: Number,
    bee_out: Number,
    metadata: {
        hive_id: { type: String, default: "default_hive" },
        location: { type: String, default: "default_location" }
    }
});

const groupSchema = new Schema ({
    name: { type: String},
    address: { type: String}
});

const cameraSchema = new Schema ({
    Group: [groupSchema]
});

module.exports = {
    RolesModel: mongoose.model('Role', rolesSchema, 'users'),
    PhotoModel: mongoose.model('Image', ImageSchema, 'PhotoGallery'),
    MLResultsModel: mongoose.model('MLResult', MLResultSchema, 'ML_Results'),
    CameraModel: mongoose.model('Group', cameraSchema, 'camera_addresses')
};