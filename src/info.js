/**
* @fileoverview Provides some basic info regarding the current Web3 environment
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
/* globals web3 */
"use strict";

/**
* Provides a base function to execute which retrieves the default account & network version, and displays them
*/
window.run = function() {
  var network = "UNDEFINED",
      account = "UNDEFINED",
      div = document.getElementById("WEB3");

  /**
  * Set the content of the info section
  */
  function setContent() {
    div.innerHTML = "<b>Web3 Network: </b>" + network + "<br/><b>Wallet Account: </b>" + account;
  }

  /**
  * Retrieve the network version and display it on the screen
  */
  web3.version.getNetwork(function(err, net) {
    if (err !== null) {
      console.error(err);
      return;
    }
    console.log("Netowrk set to \"" + net + "\"");
    network = net;
    setContent();
  });

  /**
  * Retreieve the default account and display it on the screen
  */
  web3.eth.getAccounts(function(err, acc) {
    if (err !== null) {
      console.error(err);
      return;
    }
    console.log("Account set to \"" + acc + "\"");
    account = acc;
    setContent();
  });

  setContent();
};
