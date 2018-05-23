/**
* @fileoverview Provides a parent for all contracts which make use of a linearly moving state machine.
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

import "openzeppelin-solidity/contracts/math/SafeMath.sol";


contract LinearStateMachine {
    // Apply the SafeMath library:
    using SafeMath for uint;

    /// The current stage of the contract
    uint public state = 0;

    /// Fires when the stage of the state machine advances
    event StateChange(uint newState);

    /**
    * Only allow function execution at a particular state
    */
    modifier atState(uint _state) {
        require(state == _state);
        _;
    }

    /**
    * Only allow function execution before a particular state is reached
    */
    modifier beforeState(uint _state) {
        require(state < _state);
        _;
    }

    /**
    * Only allow function execution after a particular state has passed
    */
    modifier afterState(uint _state) {
        require(state > _state);
        _;
    }

    /**
    * Increments the contract's state uppon error-free execution of the function
    */
    modifier progressesState() {
        _;
        changeState(state.add(1));
    }

    /**
    * Sets the state to a certain point in the linear progression
    */
    modifier toState(uint _state) {
        _;
        changeState(_state);
    }

    /**
    * Change the internal state & emit the corresponding event
    */
    function changeState(uint _state) internal {
        state = _state;
        emit StateChange(state);
    }
}
