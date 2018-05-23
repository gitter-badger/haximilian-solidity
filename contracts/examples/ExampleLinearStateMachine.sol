/**
* @fileoverview Example implementation of "LinearStateMachine.sol"
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

import "../state/LinearStateMachine.sol";


contract ExampleLinearStateMachine is LinearStateMachine {
    // Some content which can only be changed at a certain stage:
    uint public content;

    /**
    * Default constructor
    */
    constructor() public {
        content = 0;
    }

    /**
    * Only modifies the content before state 3 is reached. Progresses the state after each modification
    */
    function setBefore3(uint _content) public beforeState(3) progressesState {
        content = _content;
    }

    /**
    * function that allows the content to be set equal to 5 when the state is at 3
    */
    function setAt3() public atState(3) {
        content = 3;
    }

    /**
    * function that allows the content to be changed to 10 at state 3. Progresses the state after being called
    */
    function continueFrom3(uint _content) public atState(3) progressesState {
        content = _content;
    }

    /**
    * Content that allows the state to be reset after state 3. Changes content to 0.
    */
    function reset() public afterState(3) toState(0) {
        content = 0;
    }
}
