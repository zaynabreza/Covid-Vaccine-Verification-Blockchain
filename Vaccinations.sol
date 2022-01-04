// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22;
pragma experimental ABIEncoderV2;
contract Vaccinations{

    struct vaccine{
        string name;
        string batch_id;
        address addedBy;
        string administrationDate;
        string location;
    }
    struct vaccination_record{
        string user_id;
        address user_address;
        string nationality;
        string name;
        bool gender; //1 for female, 0 for male
        address createdBy;
        bytes32 detailshash;
        vaccine[] vaccinations;

    }
    struct petition{ //those who want to become a vaccination authority
        address petitioner;
        string name;
        uint8 timeLapsed;
        uint8 votesReceived;
        address[] voters;
        bool added;
    }
    mapping(address=>string) authority_name;
    address [] public authorities;
    petition [] public petitions;
    //vaccination_record[] public vaccinationRecords;
    mapping (string => vaccination_record) records;
    string[] registered_users;

    modifier onlyVaccinationAuthority{
        require(checkIfVaccinationAuthority(msg.sender), "Only Vaccination Authorities are allowed");
        _;
    }


    constructor(address a1, address a2, address a3){
        authorities.push(a1);
        authorities.push(a2);
        authorities.push(a3);
        authority_name[authorities[0]]="NADRA";
        authority_name[authorities[1]]="PIMS";
        authority_name[authorities[2]]="NCOC";
    }

    function vote(address _petitioner) public onlyVaccinationAuthority{
        for (uint i=0; i<petitions.length;i++){
            //first increment time lapsed for all petitions
            petitions[i].timeLapsed+=1;
        }
        for (uint i=0; i<petitions.length; i++){
            //add vote of the person being voted for
            if (petitions[i].petitioner==_petitioner){
                require(checkIfVoted(msg.sender, petitions[i].voters)==false, "You've already voted for them");
                require(petitions[i].added==false, "They're already added to authorities");
                petitions[i].votesReceived+=1;
                petitions[i].voters.push(msg.sender);
            }
            //next check if any votes for any petitions have reached the threshold, if so they should be added to authorities
            if (petitions[i].votesReceived>=authorities.length/2+1 && petitions[i].added==false ){
                authorities.push(petitions[i].petitioner); //add to trusted
                authority_name[petitions[i].petitioner]=petitions[i].name;
                petitions[i].added=true;
            }
            //check if any that have not receieved needed votes have been in the petitioner array for more than 10 votes, if so, remove them
            if (petitions[i].timeLapsed>=authorities.length && petitions[i].added==false){ //actually 10
                removePetition(petitions[i].petitioner);
            }
        }
    }

    //call this function in order to submit a petition if you want to become a Vaccination Authority
    function submitPetition(string memory _name) public{
        for(uint i=0; i<petitions.length; i++){
            if (petitions[i].petitioner==msg.sender){
                revert("You already have a pending a petition");
            }
        }
        require(checkIfVaccinationAuthority(msg.sender)==false, "You are already an authority!");
        petition memory temp;
        temp.petitioner=msg.sender;
        temp.timeLapsed=0;
        temp.votesReceived=0;
        temp.name=_name;
        temp.added=false;
        petitions.push(temp);
    }

    function viewPetitions() view public returns(petition[] memory){
        return petitions;
    }

    //call this function to remove a petition from petitioner array
    function removePetition(address petitioner) public  {
        for (uint i = 0;i<petitions.length; i++){
            if (petitions[i].petitioner==petitioner){
                petitions[i] = petitions[petitions.length-1];
                delete petitions[petitions.length-1];
                petitions.pop();
                break;
            }
        }

    }

    //call this function to check if a voter has already voted for this petitioner
    function checkIfVoted(address _voter, address[] memory _voters) public view returns(bool){
        bool voted=false;
        for (uint i=0; i<_voters.length; i++){
            if (_voters[i]==_voter){
                voted=true;
            }
        }
        return voted;
    }

    function checkIfVaccinationAuthority(address _vacc) public view returns(bool trust){
        bool canWeTrust = false;
        for(uint i=0;i<authorities.length;i++){
            if(_vacc==authorities[i]){
                canWeTrust = true;
            }
        }
        return canWeTrust;
    }

    function registerUser(string memory _id, string memory _name, bool _gender, string memory _nationality, address _user_address) public onlyVaccinationAuthority{
        require(userExists(_id)==false, "Record already exists for this user, update it instead");
        registered_users.push(_id);
        records[_id].name=_name;
        records[_id].gender=_gender;
        records[_id].user_id=_id;
        records[_id].createdBy=msg.sender;
        records[_id].nationality=_nationality;
        records[_id].user_address=_user_address;
    }

    function addVaccination(string memory user_id, string memory _vacName, string memory _batchID, string memory location, string memory date) public onlyVaccinationAuthority{
        require (userExists(user_id), "User not yet registered");
        vaccine memory temp;
        temp.name=_vacName;
        temp.batch_id=_batchID;
        temp.location=location;
        temp.administrationDate=date;
        temp.addedBy=msg.sender;
        records[user_id].vaccinations.push(temp);
        records[user_id].detailshash=calculateHash(user_id);
    }

    function userExists(string memory user_id) public view returns(bool){
        bool exists=false;
        for (uint i=0; i<registered_users.length; i++){
            if (keccak256(bytes(user_id))==keccak256(bytes(registered_users[i]))){
                exists=true;
            }
        }
        return exists;
    }

    //take and store hash of: cnic and name of all vaccines and their dates

    function calculateHash(string memory user_id) public view returns (bytes32 ){
        uint numVaccines=records[user_id].vaccinations.length;
        string memory latestVaccine="";
        string memory latestVaccineDate="";
        if (numVaccines>0){
            latestVaccine=records[user_id].vaccinations[numVaccines-1].name;
            latestVaccineDate=records[user_id].vaccinations[numVaccines-1].administrationDate;
        }
        return(keccak256(abi.encodePacked(user_id,",",records[user_id].name,",",records[user_id].nationality,",", latestVaccine, ",", latestVaccineDate)));
    }

    function getVaccinationRecord(string memory user_id) public view returns (vaccination_record memory){
        require (msg.sender==records[user_id].user_address || checkIfVaccinationAuthority(msg.sender), "Only the user themselves or a VA can view details");
        bytes memory tempEmptyStringTest = bytes(records[user_id].user_id);
        require(tempEmptyStringTest.length != 0,"vaccination record doesnt exist");
        return records[user_id];
    }
    function getVaccinationHash(string memory user_id) public view returns (bytes32){
        return records[user_id].detailshash;
    }
    function getVaccinationRecordPublic(string memory user_id) public view returns (string memory){
        bytes memory tempEmptyStringTest = bytes(records[user_id].user_id);
        require(tempEmptyStringTest.length != 0,"vaccination record doesnt exist");
        uint numVaccines=records[user_id].vaccinations.length;
        string memory latestVaccine="";
        string memory latestVaccineDate="";
        if (numVaccines>0){
            latestVaccine=records[user_id].vaccinations[numVaccines-1].name;
            latestVaccineDate=records[user_id].vaccinations[numVaccines-1].administrationDate;
        }
        return(string(abi.encodePacked(user_id,",",records[user_id].name,",",records[user_id].nationality,",", latestVaccine, ",", latestVaccineDate)));

    }
    function getVaccinationAuthorities() public view returns (address[] memory){
        return authorities;
    }

    function getAuthorityName(address _add) public view returns (string memory){
        return authority_name[_add];
    }

    function getHashQR(string memory data) public view returns (bytes32 ){
        return(keccak256(abi.encodePacked(data)));
    }
}

//commands to run nd test
/*
*********checking management of records**************
let x = await Vaccinations.deployed()
let acc = await web3.eth.getAccounts()
x.registerUser("1344", "Reza", 1, "Pakistani", "0x5C626149C2b5d1f199292a4C446D9f667758DfdA", {from:acc[0]})
x.calculateHash("1344")
x.getVaccinationRecord("1344")
x.addVaccination("1344", "SinoVac", "123456xda", "F-9 Islamabad", "21 October 2021",{from:acc[0]})
x.getVaccinationRecord("1344",{from:acc[0]})
x.calculateHash("1344")
x.addVaccination("4", "SinoVac", "123456xda", "F-9 Islamabad", "21 October 2021") => should return error

****************checking voting***********
x.submitPetition("Indian Health Board", {from:"0x5eF34402dD52aC15A6dE46490Eda54005EE4038f"})
x.viewPetitions()
x.vote("0x5eF34402dD52aC15A6dE46490Eda54005EE4038f")
x.vote("0x5eF34402dD52aC15A6dE46490Eda54005EE4038f", {from:acc[1]}) 
x.viewPetitions()
x.vote("0x5eF34402dD52aC15A6dE46490Eda54005EE4038f", {from:acc[2]})
x.viewPetitions()
x.getVaccinationAuthorities()
*/