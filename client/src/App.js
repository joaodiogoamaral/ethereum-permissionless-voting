import React, { Component } from "react";

import Election from "./contracts/Election.json"
import getWeb3 from "./getWeb3";

import "./App.css";
import data from "./candidates.json"
import {Button,Card,Container, Row,Col,Navbar} from 'react-bootstrap'





class App extends Component {
  

  constructor(props) {
    super(props)
    this.state = { storageValue: 0, web3: null, accounts: null, contract: null,votes: null,hasVoted:false};

  }


  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Election.networks[networkId];
      const instance = new web3.eth.Contract(
        Election.abi,
        deployedNetwork && deployedNetwork.address,
      );

      let candidates2Add = [];
      

      Object.keys(data).forEach(function(key) {
          console.log("Adding %s:",data[key].name);
          candidates2Add.push(data[key].name);
      });


      const votesArr = Array.from({length: candidates2Add.length}, (v, i) => 0)

      await instance.methods.addCandidates(candidates2Add);
      console.log("Candidates added!")
      
      
      
      
     // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance,votes:votesArr},this.init);
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  init = async () => {
    this.checkClientVoted();
    this.getVotes();
  }

  renderButton(id) {

    if(!this.state.hasVoted)
      return(<Button size='lg' variant="primary" onClick={() => {this.handleVoteClick(id) }}>Vote</Button>);
    else
      return(<div></div>);
  }

  render() {
    if (!this.state.web3 || !this.state.contract) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    

    

    
      return (
      
        <div className="App">
          <Navbar bg="dark" variant="dark"  >
            <Container>
              <Navbar.Brand href="#home">
                <img
                  alt=""
                  src={process.env.PUBLIC_URL + `logo192.png`}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  padding-right="5px"
                />
                Choose your favourite family guy character!
              </Navbar.Brand>
          </Container>
        </Navbar>
        
          
          <Container>
            <Row style={{width:'100%', padding:'5px'}}>
              
              {data.map((index) => {
                
                return (
                  <Col key={index.id}>
                  <Card style={{ width: '18rem', padding:'5px' }} border='primary'>
                        <Card.Img height='256' width='256' src={process.env.PUBLIC_URL + `${index.name}.png`} />
                        <Card.Body>
                          <Card.Title>{index.name}</Card.Title>
                          <Card.Text>{index.name} currently has {this.state.votes[index.id]} votes.</Card.Text>
                          {this.renderButton(index.id)}
                        </Card.Body>
                  </Card>
                  </Col>
                  
                );
              })}
            </Row>
          </Container>
        </div>
      );



    
  }

  handleVoteClick = async(id) => {
    await this.vote(id);
    await this.init();

  }

  vote = async(id) => {
    console.log("Voted for:" + id);
    const {contract,accounts,hasVoted} = this.state;
    await contract.methods.vote(id).send({from:accounts[0]});
    console.log("Voted for" + id);
    this.setState({contract});
  }

  getVotes= async ()=>  {
    const {contract,votes} =this.state;

    if(contract){
      for (let i=0;i<votes.length;i++) {
        votes[i] = await contract.methods.getCandidateVotes(i).call();
        console.log("NVOTES: %s", votes[i])
      }
    }else
    {
      console.log("Null contract");
    }

    this.setState({contract,votes});
  }

  checkClientVoted = async() => {
    const {contract,hasVoted,accounts} = this.state;
    console.log(accounts[0]);
    var _hasVoted=await contract.methods.hasVoted().call({from:accounts[0]});
    console.log("Has Voted: " + _hasVoted);
    this.setState({hasVoted:_hasVoted});
    
  }

}

export default App;


