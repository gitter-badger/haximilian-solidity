/**
* @fileoverview Provides a basis for contracts which are terminable.
* @author Haximilian <haximilian@gmail.com>
* @license AGPL-3.0 (See the included "LICENSE.md")
* @copyright
* Copyright (C) 2018 Haximilian
* This file is part of the program Haximilian Solidity.
*
* Haximilian Solidity is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* Haximilian Solidity is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
pragma solidity ~0.4.22;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Killable is Ownable {
    // The address of the account to which all remaining Ether should be forewarded uppon contract termination:
    address public inheritor;

    // Event to fire on destruction:
    event Destroyed();
    // Event to fire when the inheritor is changed:
    event InheritorChanged(address newInheritor);

    /**
    * Creates a new "Killable" contract, with an owner and an inheritor
    */
    constructor(address _inheritor) public Ownable() {
        if (_inheritor == address(0))
            inheritor = msg.sender;
        else
            inheritor = _inheritor;
    }

    /**
    * Kills the contract on contact from the owner & forewards all remaining Ether to the inheritor
    */
    function kill() public onlyOwner {
        selfdestruct(inheritor);
        emit Destroyed(); /* TODO test whether or not events will fire after "selfdestruct" is called */
    }

    /**
    * Changes the inheritor of the contract's inheritor
    */
    function changeInheritor(address _inheritor) public onlyOwner {
        inheritor = _inheritor;
        emit InheritorChanged(_inheritor);
    }
}
