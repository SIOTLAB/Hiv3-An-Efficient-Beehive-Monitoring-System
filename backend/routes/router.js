const express = require('express')
const router = express.Router()
const { RolesModel, PhotoModel, MLResultsModel, CameraModel} = require('../models/schemas')

router.get('/fetchrole', async (req, res) => {
  const roleName = req.query.roleName; //roleName typed into fetch URL

  try {
    const rolesData = await RolesModel.find({ "Roles.Role": roleName });

    if(!rolesData) {
      return res.status(404).json({ message: 'Role Not Found' });
    }

    const list = rolesData.map(rl => ({
      Roles: rl.Roles.filter(role => role.Role === roleName).map(role=> ({
        Role: role.Role,
        Emails: role.members.map(member=>member.aemail),
        Userid: role.members.map(member=>member.userid)
      }))
    }));

    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An Error Occured' });
  }
})

router.get('/rolelist', async (req, res) => {
  try{
    const rolesData = await RolesModel.find(); //Fetches everything

    const list = rolesData.map(rl => ({
      Roles: rl.Roles.map(role => ({
        Role: role.Role,
        Emails: role.members.map(member => member.aemail)
      }))
    }));

    res.status(200).json(list);
  } catch (error) {
    console.error("Error fetching list:", error);
    res.status(500).json({ message: 'An error occurred while fetching list'})
  }
});

router.post('/members', async (req, res) => {
  const { roleId, aemail, userid } = req.body;

  //Find role by its ID
  try { 
    const role = await RolesModel.findOne({ "Roles.id": roleId });

    if(!role) {
      return res.status(404).json({ message: 'Role id not found'});
    }

    const roleToUpdate = role.Roles.find(r=> r.id === roleId);

    const isMemberAlreadyHere = roleToUpdate.members.some(member=> member.aemail === aemail || member.userid === userid);
    if(isMemberAlreadyHere) {
      return res.status(409).json({message: 'Member Already exists in this role'});
    }

    roleToUpdate.members.push({ aemail, userid});
    await role.save();

    res.status(201).json({ message: 'Member added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An Error Occurred'})
  }
});

router.get('/findmember', async (req, res) => {
  const { current_user, role } = req.query;

  try {
  //  console.log(`Role ${role}, Current User: ${current_user}`);
    const roleWithMember = await RolesModel.findOne({
      "Roles": {
        "$elemMatch": {
          "Role": role,
            "members": {
              "$elemMatch": {
                "aemail": current_user
              }
            }
        } 
      }
    });

    if(roleWithMember) {
      res.json({ message: `Member exists in role`});
    } else {
      res.json({ message: `Member does not exist in role`});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An Error occurred while checking the member role');
  }
});

router.patch('/banuser', async (req, res) => {
  const { userId, userEmail } = req.body;

  try{
    const guestRole = await RolesModel.findOne({ "Roles.Role": "Guest" });
  
    if(!guestRole) {
      return res.status(404).json({ message: "Guest Role not found"});
    }
    console.log(guestRole);

    const guestRolesUpdate = guestRole.Roles.find(role=> role.Role === "Guest");
    console.log(guestRolesUpdate);
    const memberIndex = guestRolesUpdate.members.findIndex(member => member.userid === userId);
    
    
    if(memberIndex === -1) {
      return res.status(404).json({ message: "User not found in Guest Role" });
    }

    //Remove user from Guest Role
    guestRolesUpdate.members.splice(memberIndex, 1);
    await guestRole.save();

    //Find banned role and add user to it 
    const bannedRole = await RolesModel.findOne({ "Roles.Role": "Banned" });
    if(!bannedRole) {
      return res.status(404).json({message: "Banned Role not found"});
    }

    const bannedRoleToUpdate = bannedRole.Roles.find(role => role.Role === "Banned" );
    bannedRoleToUpdate.members.push({ aemail: userEmail, userid: userId});
    await bannedRole.save();

    res.json({message: "User has been banned" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occrred while banning"})
  }
});

router.patch('/banadmin', async (req, res) => {
  const { userId, userEmail } = req.body;

  try{
    const adminRole = await RolesModel.findOne({ "Roles.Role": "Admin" });
  
    if(!adminRole) {
      return res.status(404).json({ message: "Admin Role not found"});
    }
    console.log(adminRole);

    const adminRolesUpdate = adminRole.Roles.find(role=> role.Role === "Admin");
    const memberIndex = adminRolesUpdate.members.findIndex(member => member.userid === userId);
    
    
    if(memberIndex === -1) {
      return res.status(404).json({ message: "User not found in Admin Role" });
    }

    //Remove user from Admin Role
    adminRolesUpdate.members.splice(memberIndex, 1);
    await adminRole.save();

    //Find banned role and add user to it 
    const bannedRole = await RolesModel.findOne({ "Roles.Role": "Banned" });
    if(!bannedRole) {
      return res.status(404).json({message: "Banned Role not found"});
    }

    const bannedRoleToUpdate = bannedRole.Roles.find(role => role.Role === "Banned" );
    bannedRoleToUpdate.members.push({ aemail: userEmail, userid: userId});
    await bannedRole.save();

    res.json({message: "User has been banned" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occrred while banning"})
  }
});

router.patch('/demoteadmin', async (req, res) => {
  const { userId, userEmail } = req.body;

  try{
    const adminRole = await RolesModel.findOne({ "Roles.Role": "Admin" });
  
    if(!adminRole) {
      return res.status(404).json({ message: "Admin Role not found"});
    }
    console.log(adminRole);

    const adminRolesUpdate = adminRole.Roles.find(role=> role.Role === "Admin");
    const memberIndex = adminRolesUpdate.members.findIndex(member => member.userid === userId);
    
    
    if(memberIndex === -1) {
      return res.status(404).json({ message: "User not found in Admin Role" });
    }

    //Remove user from Admin Role
    adminRolesUpdate.members.splice(memberIndex, 1);
    await adminRole.save();

    //Find guest role and add user to it 
    const guestRole = await RolesModel.findOne({ "Roles.Role": "Guest" });
    if(!guestRole) {
      return res.status(404).json({message: "Guest Role not found"});
    }

    const guestRoleToUpdate = guestRole.Roles.find(role => role.Role === "Guest" );
    guestRoleToUpdate.members.push({ aemail: userEmail, userid: userId});
    await guestRole.save();

    res.json({message: "User has been demoted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occrred while demoting"})
  }
});


router.patch('/unbanuser', async (req, res) => {
  const { userId, userEmail } = req.body;

  try{
    const banRole = await RolesModel.findOne({ "Roles.Role": "Banned" });
  
    if(!banRole) {
      return res.status(404).json({ message: "Ban Role not found"});
    }

    const banRolesUpdate = banRole.Roles.find(role=> role.Role === "Banned");
    const memberIndex = banRolesUpdate.members.findIndex(member => member.userid === userId);
    
    
    if(memberIndex === -1) {
      return res.status(404).json({ message: "User not found in Ban Role" });
    }

    //Remove user from Ban Role
    banRolesUpdate.members.splice(memberIndex, 1);
    await banRole.save();

    //Find banned role and add user to it 
    const guestRole = await RolesModel.findOne({ "Roles.Role": "Guest" });
    if(!guestRole) {
      return res.status(404).json({message: "Guest Role not found"});
    }

    const guestRoleToUpdate = guestRole.Roles.find(role => role.Role === "Guest" );
    guestRoleToUpdate.members.push({ aemail: userEmail, userid: userId});
    await guestRole.save();

    res.json({message: "User has been unbanned" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occrred while banning"})
  }
});

router.patch('/promoteuser', async (req, res) => {
  const { userId, userEmail } = req.body;

  try{
    const guestRole = await RolesModel.findOne({ "Roles.Role": "Guest" });
  
    if(!guestRole) {
      return res.status(404).json({ message: "Guest Role not found"});
    }
    console.log(guestRole);

    const guestRolesUpdate = guestRole.Roles.find(role=> role.Role === "Guest");
    console.log(guestRolesUpdate);
    const memberIndex = guestRolesUpdate.members.findIndex(member => member.userid === userId);
    
    
    if(memberIndex === -1) {
      return res.status(404).json({ message: "User not found in Guest Role" });
    }

    //Remove user from Guest Role
    guestRolesUpdate.members.splice(memberIndex, 1);
    await guestRole.save();

    //Find admin role and add user to it 
    const adminRole = await RolesModel.findOne({ "Roles.Role": "Admin" });
    if(!adminRole) {
      return res.status(404).json({message: "Admin Role not found"});
    }

    const adminRoleToUpdate = adminRole.Roles.find(role => role.Role === "Admin" );
    adminRoleToUpdate.members.push({ aemail: userEmail, userid: userId});
    await adminRole.save();

    res.json({message: "User has been promoted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occrred while promoting"})
  }
});



router.get('/images', async (req, res) => {
  try {
      const images = await PhotoModel.find().sort({_id: -1}).limit(18);
      const imagesWithBase64 = images.map(img => ({
          ...img._doc,
          data: 'data:image/jpeg;base64,' + img.data.toString('base64')
      }));
      res.json(imagesWithBase64);
  } catch (error) {
      res.status(500).send(error);
  }
});


router.get('/ml_info', async (req, res) => {
  try {
    const results = await MLResultsModel.find({});
    res.json(results)
  } catch (error) {
    res.status(500).send(error)
  }
});

router.get('/addresslist', async (req, res) => {
  try{
    const addressData = await CameraModel.find(); //Fetches everything

    const list = addressData.flatMap(i => i.Group.map(group => ({
      name: group.name,
      Address: group.address
    })));

    res.status(200).json(list);
  } catch (error) {
    console.error("Error fetching list:", error);
    res.status(500).json({ message: 'An error occurred while fetching list'})
  }
});

router.post('/addaddress', async (req, res) => {
  const { name, address } = req.body;

  if(!name || !address) {
    return res.status(400).json({ message: 'Address and Name are both needed '});
  }

  try {
    const camera = await CameraModel.findOne();

    if(!camera) { //If we remove all ip address by accident
      const newCamera = new CameraModel({
        Group: [{ name, address }]
      });
      await newCamera.save();
      return res.status(201).json({ message: 'Address/Name added successfully', group: newCamera});
    }

    const isGroupAlreadyHere = camera.Group.some(group => group.name === name && group.address === address);
    if(isGroupAlreadyHere) {
      return res.status(409).json({ message: 'Group already exists!' });
    }

    camera.Group.push({ name, address });
    await camera.save();

    res.status(201).json({ message: 'Group added successfully', group: camera});
  } catch (error) {
    console.error("Error adding group:", error);
    res.status(500).json({ message: "An error Occured!"});
  }
});


module.exports = router