"use strict";
import React, {Component} from 'react';
import Web3 from 'web3'
import {SIMP_STORAGE_ADDRESS, SIMP_STORAGE_ABI} from './config.js'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./App.css"
import QrReader from 'react-qr-reader'
import { Col,Row,Card } from 'react-bootstrap';


class App extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data,
        msg: "Scan Successful",
        dis: false
      })
    }
  }
  handleError = err => {
    console.error(err)
  }

  constructor() {
    super()
    this.state = {
      account:"No address associated",
      val:"",
      result: " ",
      dis: true,
      msg: "Hold still!",
      msg2: "",
      simpcontract: '',
      value:"",
      value2:"",
      hash:"",
      hash2:"",
      isverify:"",
      va:""
    }

  }

  componentDidMount() {
    this.loadBlockchainData()
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3("HTTP://127.0.0.1:7545")
    const simpstorage = new web3.eth.Contract(SIMP_STORAGE_ABI, SIMP_STORAGE_ADDRESS);
    this.setState({simpcontract: simpstorage})

    var msg = '';

  }

  async sign(web3, text, addr) {
    await web3.eth.sign('0x' + this.toHex(text), addr).then(result => {
      this.setState({
        signature: result.substr(2)
      })
    })
    this.state.r = this.state.signature.slice(0, 64)
    this.state.s = this.state.signature.slice(64, 128)
    this.state.v = this.state.signature.slice(128, 130)
    //this.state.v_dec=web3.utils.toDecimal(this.state.v)
    console.log(this.state.signature)
    console.log(this.state.r)
    console.log(this.state.s)
    console.log(this.state.v_dec)

  }

  async getHashQR(cnic, simpstorage) {

    const value = await simpstorage.methods.calculateHash(cnic).call().then(res => {
      this.setState({hash: res})
    })

    // this.setState({value: value})
    // console.log(this.state.value)
  }
  async getHash(cnic, simpstorage) {
    const value = await simpstorage.methods.calculateHash(cnic).call().then(res => {
    this.setState({hash2: res})
  })
}
  parsePetitionList(str){
    // return str
    var str2=""
    var x= str.split(",")
    for(var i=0;i<x.length;i++){

      str2+="\npetitioner: "
      str2+=x[i]

      str2+="\nname: "
      str2+=x[i+1]

      str2+=", time: "
      str2+=x[i+2]

      str2+=", votes: "
      str2+=x[i+3]
      str2+="\n"
      i+=parseInt(x[i+3])
      if (parseInt(x[i+3])==0){i++}
      i+=3
      i++
      str2+="\n"

    }
    return str2;

  }

  toHex(str) {
    var hex = ''
    for(var i=0;i<str.length;i++) {
      hex += ''+str.charCodeAt(i).toString(16)
    }
    return hex
  }

  async getUserData(id, simpstorage){
    const value = await simpstorage.methods.getVaccinationRecord(id.toString()).call({from: this.state.account}).catch((error) => {alert("User Vaccination record doesn't exist/ Not Authorized")})
    console.log(value)

    if( value!=null) {
      const val=this.parseUserData(value.toString())
      this.setState({value: val.toString()})
    }
    else{
      this.setState({value: "not found"})
    }
  }
  async getUserDataForOthers(id, simpstorage){
    const value = await simpstorage.methods.getVaccinationHash(id.toString()).call().catch((error) => {alert("User Vaccination record doesn't exist")})

    if( value!=null) {
      this.setState({value2: value})
      if(this.state.hash==this.state.value2 ){
        this.setState({isverify: "QR Verified with Blockchain"})

      }
      else if(this.state.hash2==this.state.value2){
        this.setState({isverify: "Hash Verified with Blockchain"})
      }
      else{
        this.setState({isverify: "Hash DOES NOT Verify with Blockchain"})
      }
    }
  }
  parseUserData(str){
    // return str
    var str2=""
    var x= str.split(",")
    for(var i=0;i<x.length;i++) {
      if (i  == 0) {
        str2 += "\nCnic/id: "
        str2 += x[i]
      } else if (i == 1) {
        str2 += "\nUser_address: "
        str2 += x[i]
      } else if (i == 2) {
        str2 += "\nCountry: "
        str2 += x[i]
      } else if (i  == 3) {
        str2 += ", Name: "
        str2 += x[i]
      } else if (i == 4) {
        str2 += ", Gender: "
        // str2 += x[i]
        if(x[i]=="false"){str2 += "Male"}
        else if(x[i]=="true"){str2 += "Female"}
      }
      else if (i == 5) {
        str2 += "\nCreated by: "
        str2 += x[i]
      } else if (i == 6) {
        str2 += "\nHash: "
        str2 += x[i]

      }
  else{

        str2 += "\nVaccination: "
        str2+=x[i]
        str2 += ",BatchID: "
        str2+=x[i+1]
        str2 += "\nAdded by: "
        str2+=x[i+2]
        str2 += ",AdministrationDate: "
        str2+=x[i+3]
        str2 += ", Location: "
        str2+=x[i+4]
        i+=4

      }
    }

    return str2;

  }
  async getPetitionData( simpstorage){
    const val = await simpstorage.methods.viewPetitions().call()
    const val2=this.parsePetitionList(val.toString())
    this.setState({ petitions:val2   })
  }

  handleSubmit(e){
    e.preventDefault();
    e.target.reset();
  }
  async getVAData( simpstorage){
    const value = await simpstorage.methods.getVaccinationAuthorities().call()
    const val = this.parseList(value.toString())
    this.setState({ va: val })
  }
  async getmsg( ){
    this.setState({ msg2: "Vote Casted"})
  }
  parseList(str){
    var str2 = ''
    for(var i=0;i<str.length;i++) {
      if (str[i]==",") {
        str2 += "\n"
      }
      else{
        str2 += str[i]
      }
    }
    return str2
  }
  render() {
    return (

          <div className="App-header">
            <div className="bg-card" style={{borderRadius:"4rem"}}>

              {/*<div className="image">*/}
              <img className="image" src="./image.jpg" style={{borderRadius: '90rem',width:"20rem",height:"25rem"}}/>
              {/*</div>*/}
              {/*<div className="tabs">*/}
              <Tabs className="tabs">

          <TabList style={{}}>
            <Tab>Register user</Tab>
            <Tab>Register Vaccination</Tab>
            <Tab>Get Record</Tab>
            <Tab>Get Hash/ Verify</Tab>
            <Tab>Vote</Tab>
            <Tab>Add Petition</Tab>
          </TabList>

          <TabPanel style={{}}>
          {/*  // function registerUser(string memory _id, string memory _name, bool _gender, string memory _nationality,*/}
          {/*//  address _user_address) public onlyVaccinationAuthority{*/}
            <div>
              <h1> Welcome! </h1>

              <p>Enter Your Account Address: </p>
              <form onSubmit={(event) => {
                event.preventDefault()
                const accNum = new FormData(event.target).get("accountNum");
                this.state.account=accNum;
                this.setState({account:accNum})
                this.handleSubmit(event)
              }}>
                <input id="acnum" name="accountNum" type="text" placeholder='Account Address' required style={{borderRadius:"1rem",background:"#ffffff"}}/>
                <input type="submit" hidden="" value="Use Address" style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}} />
              </form>
              <h4>Using Account at Address: {this.state.account}</h4>
              <p>REGISTERATION: Enter the following details:</p>

              <form onSubmit={(event) => {
                event.preventDefault()

                const cnic = new FormData(event.target).get("cnic");
                const name = new FormData(event.target).get('name');
                const countryName = new FormData(event.target).get('countryName');
                const gender = new FormData(event.target).get('gender');
                const addr = new FormData(event.target).get('addr');


                this.state.simpcontract.methods.registerUser(cnic,name,gender,countryName,addr).send({ from: this.state.account, gas:900000 }).catch((error) => {
                  this.setState({ err2:"User already exists/only Authority is allowed to register"})} )
                this.loadBlockchainData()
                this.handleSubmit(event)
              }} >
                <input id="cnic" name ="cnic" type="text" placeholder="Cnic/id" required style={{borderRadius:"1rem",background:"#ffffff"}} />
                <input id="name" name ="name" type="text" placeholder= "Full name" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                {/*<input id="gender" name ="gender" type="radio" placeholder="gender" required style={{borderRadius:"1rem",background:"#ffffff"}}  />*/}
                <select  id="gender" name ="gender">
                  <option  value="1">Gender</option>
                  <option value="1">Female</option>
                  <option value="0">Male</option>
                </select>
                <input id="countryName" name ="countryName" type="country" placeholder= "Country Name" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                <input id="addr" name ="addr" type="text" placeholder=" Address" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                <input type="submit" hidden=""  style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}} />
              </form>
              <p>{this.state.err2}</p>
            </div>
              </TabPanel>
          <TabPanel style={{}}>
                  {/*function addVaccination(string memory user_id, string memory _vacName, string memory _batchID, string memory location, string memory date) public onlyVaccinationAuthority{*/}

                  <div>
                    <h1> Register Vaccination </h1>
                    <h4>Using Account at Address: {this.state.account}</h4>
                    <p> VACCINATION REGISTERATION: Enter the following details:</p>

                    <form onSubmit={(event) => {
                      event.preventDefault()

                      const cnic = new FormData(event.target).get("cnic");
                      const vacName = new FormData(event.target).get('vacName');
                      const batchID = new FormData(event.target).get('batchID');
                      const _location= new FormData(event.target).get('_location');
                      const date = new FormData(event.target).get('date');
                      console.log(cnic)
                      console.log(vacName)
                      console.log(batchID)
                      console.log(_location)
                      console.log(date)
                      this.state.simpcontract.methods.addVaccination(cnic.toString(),vacName.toString(),batchID.toString(),_location.toString(),date.toString()).send({ from: this.state.account, gas:900000 }).catch((error) => {
                        alert("Only Vaccination Authorities are allowed")})
                      // Only Vaccination Authorities are allowed
                      this.loadBlockchainData()
                      this.handleSubmit(event)
                    }} >
                      <input id="cnic" name ="cnic" type="text" placeholder="Cnic/id" required style={{borderRadius:"1rem",background:"#ffffff"}} />
                      <input id="vacName" name ="vacName" type="text" placeholder= "Vaccination name" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                      <input id="batchID" name ="batchID" type="text" placeholder= "batchID" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                      <input id="_location" name ="_location" type="text" placeholder="location" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                      <input id="date" name ="date" type="date" placeholder="date" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                      <input type="submit" hidden=""  style={{width:"8rem",borderRadius:"1rem",background:"silver",marginLeft:"1rem"}} />
                    </form>
                  </div>
                </TabPanel>
          <TabPanel style={{}}>
                  <div>
                    <h1>Only Vaccination Authority/User</h1>
                    <h4>Using Account at Address: {this.state.account}</h4>
                    <form onSubmit={(event) => {
                      event.preventDefault()
                      const userId = new FormData(event.target).get("getName");
                      this.getUserData(userId, this.state.simpcontract)
                      // this.loadBlockchainData()
                    }}>
                      <input type="text" id="getName" name="getName" placeholder="Cnic/id"required style={{borderRadius:"1rem",background:"#ffffff"}}/>
                      <input type="submit" hidden="" value="Get" style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}}/>
                    </form>
                    <p style={{whiteSpace: 'pre-wrap'}}>{this.state.value}</p>

                  </div>
                  <div style={{marginTop:"18rem"}}></div>
          </TabPanel>
          <TabPanel style={{}}>
            <div>
<div className="sub-bg-card">

              <div  style={{paddingLeft:"5vw",marginRight:"0vw",width:"55vw",flex:1}}>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  this.getHashQR(this.state.result, this.state.simpcontract)
                  // this.loadBlockchainData()
                  console.log("here")
                  console.log(this.state.value)

                }}>
                  {/*<input type="text" id="getName" name="getName" placeholder="Domain Name"required style={{borderRadius:"1rem",background:"#ffffff"}}/>*/}

                  <QrReader
                      id="data"
                      name="data"
                      delay={300}
                      onError={this.handleError}
                      onScan={this.handleScan}

                      style={{ width: '30%' }}
                  />
                  <p>{this.state.msg}</p>
                  <input disabled={this.state.dis} type="submit" hidden="" value="Hash" style={{width:"20%",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}}/>

                </form>

              </div>
              <div  style={{paddingRight:"10vw",width:"0.2vw",flex:1}}>
                <h3>OR Enter the following details:</h3>

                <form onSubmit={(event) => {
                  event.preventDefault()


                  const cnic = new FormData(event.target).get('cnic');


                  this.getHash(cnic.toString(), this.state.simpcontract)

                }} >
                  <input id="cnic" name ="cnic" type="number" placeholder= "Cnic/id" required style={{borderRadius:"1rem",background:"#ffffff"}}  />

                  <input type="submit" hidden=""  style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}} />
                </form>

              </div>
</div>
            <div>
              <p>QR Hash:{this.state.hash}</p>
              <p>Hash: {this.state.hash2}</p>
              <h3>Verify Results With Blockchain</h3>
              <form onSubmit={(event) => {
                event.preventDefault()
                const userId = new FormData(event.target).get("getName");
                this.getUserDataForOthers(userId, this.state.simpcontract)
                // this.loadBlockchainData()
              }}>
                <input type="text" id="getName" name="getName" placeholder="Cnic/Id"required style={{borderRadius:"1rem",background:"#ffffff"}}/>
                <input type="submit" hidden="" value="Get" style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}}/>
              </form>
            </div>
              <p>{this.state.isverify}</p>

</div>

            {/*<div style={{marginTop:"20rem"}}></div>*/}

          </TabPanel>
          <TabPanel style={{}}>
            <div>
              <h1>Vote for a Petition:</h1>
              <h4>Using Account at Address: {this.state.account}</h4>

              <form onSubmit={(event) => {
                event.preventDefault()

                const addr = new FormData(event.target).get("addr");

                this.state.simpcontract.methods.vote(addr).send({ from: this.state.account, gas:900000 }).catch((error) => {
                  alert("You've already voted for them/n OR They're already added to authorities")})
                this.getmsg()
              }} >
                <input id="addr" name ="addr" type="text" placeholder="enter address" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                <input type="submit" hidden=""  style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}} />
              </form>
              <p>{this.state.msg2}</p>
              {/*see VAs*/}
              <div>
                <h5>view all Vaccination Authorities:</h5>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  this.getVAData(this.state.simpcontract)


                }}>
                  <input type="submit" hidden="" value="view all VAs" style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}}/>
                </form>
                <p>{this.state.va}</p>
              </div>

            </div>

            <div style={{marginTop:"18rem"}}></div>
          </TabPanel>
          <TabPanel>
              <div>
                <h1>Register as Vaccinaton Authority:</h1>
                <h4>Using Account at Address: {this.state.account}</h4>
                <p>click to submit petition:</p>

                <form onSubmit={(event) => {
                  event.preventDefault()

                  const domainName = new FormData(event.target).get("domainName");
                  const name = new FormData(event.target).get("name");
                  this.setState({ err:"Done!"})
                  this.state.simpcontract.methods.submitPetition(name).send({ from: this.state.account, gas:900000 }).catch((error) => {
                    this.setState({ err:"You already have a pending a petition"})

                  });

                  this.loadBlockchainData()
                  this.handleSubmit(event)
                }} >
                  <input id="name" name ="name" type="text" placeholder="enter name" required style={{borderRadius:"1rem",background:"#ffffff"}}  />

                  <input type="submit" hidden=""  style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}} />
                </form>
                <p>{this.state.err}</p>
                {/*see petitions*/}
                <div>
                  <h5>view all petitions:</h5>
                  <form onSubmit={(event) => {
                    event.preventDefault()

                    this.getPetitionData(this.state.simpcontract)


                  }}>

                    <input type="submit" hidden="" value="view petitions" style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}}/>
                  </form>
                  <text style={{whiteSpace: 'pre-wrap'}}>{this.state.petitions}</text>
                </div>
              </div>

          </TabPanel>
        </Tabs>

      </div>


        </div>

    );
  }
}
export default App;