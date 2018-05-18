/**
* @fileoverview Asynchronously loads compiled JSON files from their relative URLs
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
"use strict";

window.loadJSON = function(url) {
  console.log("Loading \"" + url + "\" into environment...");
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log("JSON request for \"" + url + "\" resolved.");
        resolve(JSON.parse(this.responseText));
      }
    };

    request.open("GET", url, true);
    request.send();
  });
};
