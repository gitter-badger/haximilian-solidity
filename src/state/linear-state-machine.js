﻿/**
* @fileoverview Provides an interface for playing around with `LinearStateMachine` contracts
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

var contract, address, instance;

/**
* Prints the input text to the ouput terminal in the web app
* @param {string} text The text to be printed to the terminal
*/
function output(text) {
  var outputHandle = document.getElementById("OUTPUT");
  outputHandle.appendChild(document.createTextNode("> " + text));
  outputHandle.appendChild(document.createElement("br"));
  outputHandle.scrollTop = outputHandle.scrollHeight;
}

/**
* Sets the currnet contract instance according to the provided address
*/
function setInstance() {
  // Acquire the address:
  var addr = document.getElementById("ADDRESS").value;
  if (addr.charAt(1) !== "x" && addr.charAt(0) !== "0") addr = "0x" + addr;
  // Skip if the address hasn't changed:
  if (addr === address) {
    console.log("Address unchanged: \"" + addr + "\"");
    return;
  }

  // Change the contract instance:
  console.log("Address changed to: \"" + addr + "\"");
  address = addr;
  instance = new Promise((resolve) => {
    contract.then((_contract) => {
      resolve(_contract.at(addr));
      return _contract;
    });
  });

  /**
  * Initialize the event listeners on the newly created instance
  * @param {object} _instance The contract handle on which to set the listeners
  */
  instance.then((_instance) => {
    /**
    * When the `StateChange` event is triggered, print a response to the in-app console
    * @param {object} err The error object, in case something goes wrong in regestering the event listener
    * @param {object} response The object produced when the blockchain event is triggered.
    */
    _instance.StateChange({}).watch((err, response) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else {
        output("[EVENT] \"StateChange\" triggered: " + response.args.newState);
        console.group();
        console.log(">> [EVENT] StateChange");
        console.log(response);
        console.groupEnd();
      }
    });
  });
}

var info = window.run;
/**
* In addition to the existing info function, also initialize the contract when the window is loaded
*/
window.run = function() {
  info();

  contract = new Promise((resolve) => {
    window.loadJSON("../../build/contracts/ExampleLinearStateMachine.json").then((json) => {
      resolve(web3.eth.contract(json.abi));
      return json;
    });
  });
};

/**
* Retrieve the current state from the contract instance and print it to the in-app console
*/
window.getState = function() {
  setInstance();
  instance.then((_instance) => {
    _instance.state({}, (err, state) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else
        output("Current State: " + state);
    });
    return _instance;
  });
};

/**
* Retrieve the content value from the contract instance and print it to the in-app console
*/
window.getContent = function() {
  setInstance();
  instance.then((_instance) => {
    _instance.content({}, (err, content) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else
        output("Content Value: " + content);
    });
    return _instance;
  });
};

/**
* Call the "setBefore3" contract method & print the result in the in-app console
*/
window.setBefore3 = function() {
  setInstance();
  var val = document.getElementById("CONTENT").value;
  instance.then((_instance) => {
    _instance.setBefore3(val, {}, (err, response) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else
        output("Content Set: " + response);
    });
    return _instance;
  });
};

/**
* Call the "setAt3" contract method & print the result in the in-app console
*/
window.setAt3 = function() {
  setInstance();
  instance.then((_instance) => {
    _instance.setAt3({}, (err, response) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else
        output("Content Set: " + response);
    });
    return _instance;
  });
};

/**
* Call the "continueFrom3" contract method & print the result in the in-app console
*/
window.continueFrom3 = function() {
  setInstance();
  var val = document.getElementById("CONTENT").value;
  instance.then((_instance) => {
    _instance.continueFrom3(val, {}, (err, response) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else
        output("Content set: " + response);
    });
    return _instance;
  });
};

/**
* Call the "reset" contract method & print the result in the in-app console
*/
window.reset = function() {
  setInstance();
  instance.then((_instance) => {
    _instance.reset({}, (err, response) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else
        output("Content set: " + response);
    });
    return _instance;
  });
};