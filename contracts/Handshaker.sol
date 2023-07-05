// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.18;
import "./Ownable.sol";

enum relation { NONE, PREDECESSOR, SUCCESSOR, LABEL, PRODUCT }

contract Handshaker is Ownable{

    function reverseRelation(relation r) public pure returns(relation){
        uint relation_int = uint(r);
        if (relation_int%2 == 0){ // if even
            return relation(relation_int - 1);
        }
        else{
            return relation(relation_int + 1);
        }
    }
    
    address Owner;

    mapping(address => relation) public Candidates;
    mapping(relation => address[]) public Ids;

    
    function Get_Owner() external view returns(address owner){
        return Owner;
    }

    
    // region handshake
    function Has_Candidate(address candidateAddress, relation r) public view returns(bool){
        return Candidates[candidateAddress] == r;
    }

    function Accept_Candidate(relation r) public {
        require(Candidates[msg.sender] == reverseRelation(r), "Requestor is not a candidate.");
        Candidates[msg.sender] = relation.NONE;
        Ids[reverseRelation(r)].push(msg.sender);
    }

    function Do_Handshake(address Address, relation r) public returns(bool){
        Handshaker handshaker = Handshaker(Address);

        if(handshaker.Candidates(address(this)) == reverseRelation(r)){
            Ids[r].push(Address);
            handshaker.Accept_Candidate(r);
            
            return true;
        }
        else{
            Candidates[Address] = r;
            
            return false;
        }
    }

    // end region handshake
}