----

# WARNING

AS OF THE CURRENT VERSION, THIS PROJECT **HAS NOT BEEN AUDITED** AND COMES WITH **NO WARRANTIES OR GUARANTEES**, INCLUDING IMPLIED WARRANTIES, SUCH AS FITNESS FOR A PARTICULAR PURPOSE. **USE AT YOUR OWN RISK**.

----

# Haximilian Solidity
A set of contracts and libraries designed for more complex use cases


![NPM License](https://img.shields.io/npm/l/haximilian-solidity.svg)
![NPM Version](https://img.shields.io/npm/v/haximilian-solidity.svg)
[![Join the chat at https://gitter.im/haximilian/haximilian-solidity](https://badges.gitter.im/haximilian/haximilian-solidity.svg)](https://gitter.im/haximilian/haximilian-solidity?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Examples](https://www.libhive.com/providers/npm/packages/haximilian-solidity/examples/badge.svg)](https://www.libhive.com/providers/npm/packages/haximilian-solidity)
![NPM Downloads](https://img.shields.io/npm/dt/haximilian-solidity.svg)
![NPM Downloads/week](https://img.shields.io/npm/dw/haximilian-solidity.svg)

## [<img src="https://opensource.org/files/osi_symbol.png" width="50">](https://opensource.org/licenses/AGPL-3.0) License
*Copyright &copy; 2018 Haximilian*<br/>
**This project is licensed under the [GNU Affero General Public License Agreement v3.0 (AGPL-3.0)](https://opensource.org/licenses/AGPL-3.0).**<br>
For a complete copy of the license, please see the included file "LICENSE.md".

## Getting Started
First, create a new project with [truffle](http://truffleframework.com/):

> npm install -g truffle<br/>
> mkdir my-project<br/>
> cd ./my-project<br/>
> truffle init
> npm init

### Installation
The current stable version of this project can be installed from [NPM](https://www.npmjs.com/package/haximilian-solidity) with the following command:

> npm install --save haximilian-solidity

### Using the libraries
Inside your solidity contracts, you can include each contract from its respective directory. For example:
```solidity
include "haximilian-solidity/contracts/staging/Staging.sol";
```
For more information, see the *USAGE.md* file located inside each subdirectory of *haximilian-solidity/contracts*.

## Building from source
To get things started, you'll need to [install NPM](https://docs.npmjs.com/getting-started/installing-node#install-npm--manage-npm-versions).

### Get the code
Just grab the latest stable version off the official GitHub page:
> git clone https://github.com/haximilian/haximilian-solidity.git

### Install Dependencies
Enter into the new directory ("./haximilian-solidity") and run NPM:
> npm install

### Compile and deploy
Building the contracts is as easy as running
> npm run build

Then, all you need to do to deploy the code to the network is to make sure that you have an ethereum node running, pointed to the desired network, and simply run
> npm run deploy
