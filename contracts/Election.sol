pragma solidity ^0.8.0;

contract Election {

    mapping(uint => Candidate) public candidateList;


    function addCandidates(string [] memory _names) public {

        for(uint i=0;i< _names.length;i++)
        {
            candidateList[i] = Candidate(_names[i],1); //init list with names and votes at 0
        }

    }


    struct Candidate {

        string name;
        uint nVotes;

    }

    function vote(uint id) public{

        candidateList[id].nVotes++;

    }


    function getCandidateVotes(uint id) public view returns (uint) {
        return candidateList[id].nVotes;
    }

    
}