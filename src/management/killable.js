/**
* @fileoverview Provides an interface for playing around with `Killable` contracts
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

/* TODO Add proper JSDoc to all methods */

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
* Sets the currnet instance according to the provided address
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

  instance.then((_instance) => {
    _instance.InheritorChanged({}).watch((err, response) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else {
        output("[EVENT] \"InheritorChanged\" triggered: " + response.args.newInheritor);
        console.group();
        console.log(">> [EVENT] InheritorChanged");
        console.log(response);
        console.groupEnd();
      }
    });

    _instance.OwnershipTransferred({}).watch((err, response) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else {
        output("[EVENT] \"OwnershipTransferred\" triggered: " + response.args.newOwner);
        console.group();
        console.log(">> [EVENT] OwnershipTransferred");
        console.log(response);
        console.groupEnd();
      }
    });

    _instance.Destroyed({}).watch((err, response) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else {
        output("[EVENT] \"Destroyed\" triggered.");
        console.group();
        console.log(">> [EVENT] Destroyed");
        console.log(response);
        console.groupEnd();
      }
    });
  });
}

var info = window.run;
window.run = function() {
  info();

  contract = new Promise((resolve) => {
    window.loadJSON("../../build/contracts/Killable.json").then((json) => {
      resolve(web3.eth.contract(json.abi));
      return json;
    });
  });
};

window.getOwner = function() {
  setInstance();
  instance.then((_instance) => {
    _instance.owner({}, (err, owner) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else
        output("Contract Owner: " + owner);
    });
    return _instance;
  });
};

window.getInheritor = function() {
  setInstance();
  instance.then((_instance) => {
    _instance.inheritor({}, (err, inheritor) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else
        output("Contract Inheritor: " + inheritor);
    });
    return _instance;
  });
};

window.setOwner = function() {
  setInstance();
  var addr = document.getElementById("OWNER").value;
  if (addr.charAt(1) !== "x" && addr.charAt(0) !== "0") addr = "0x" + addr;
  instance.then((_instance) => {
    _instance.transferOwnership(addr, {}, (err, response) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else
        output("Owner transferred: " + response);
    });
    return _instance;
  });
};

window.setInheritor = function() {
  setInstance();
  var addr = document.getElementById("INHERITOR").value;
  if (addr.charAt(1) !== "x" && addr.charAt(0) !== "0") addr = "0x" + addr;
  instance.then((_instance) => {
    _instance.changeInheritor(addr, {}, (err, response) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else
        output("Inheritor changed: " + response);
    });
    return _instance;
  });
};

window.kill = function() {
  setInstance();
  instance.then((_instance) => {
    _instance.kill({}, (err, response) => {
      if (err) {
        console.error(err);
        output("ERROR: " + err.message);
      } else
        output("Killed contract: " + response);
    });
    return _instance;
  });
};
