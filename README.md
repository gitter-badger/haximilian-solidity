----

# WARNING

AS OF THE CURRENT VERSION, THIS PROJECT **HAS NOT BEEN AUDITED** AND COMES WITH **NO WARRANTIES OR GUARANTEES**, INCLUDING IMPLIED WARRANTIES, SUCH AS FITNESS FOR A PARTICULAR PURPOSE. **USE AT YOUR OWN RISK**.

----

# Haximilian Solidity
A set of contracts and libraries designed for more complex use cases


![NPM License](https://img.shields.io/npm/l/haximilian-solidity.svg)
![NPM Version](https://img.shields.io/npm/v/haximilian-solidity.svg)
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

Alternatively, you can install the bleeding-edge, **highly unstable** version of the library to gain access to the very latest developmental contract templates, but this **for development use only** and **under no circumstances should be used in production**:

> npm install --save haximilian-solidity@unstable

### Using the libraries
Inside your solidity contracts, you can include each contract from its respective directory. For example:
```solidity
include "haximilian-solidity/contracts/staging/Staging.sol";
```
For more information, see the *USAGE.md* file located inside each subdirectory of *haximilian-solidity/contracts*:

 - [haximilian-solidity/contracts/management](contracts/management/USAGE.md)
 - [haximilian-solidity/contracts/state](contracts/state/USAGE.md)

## Building from source
To get things started, you'll need to [install NPM](https://docs.npmjs.com/getting-started/installing-node#install-npm--manage-npm-versions).

### Get the code
Just grab the latest stable version off the official GitHub page:
> git clone https://github.com/haximilian/haximilian-solidity.git

Or grab the unstable code, but once again, **you shouldn't do this unless you know what you're doing**:
> git clone -b unstable https://github.com/haximilian/haximilian-solidity.git

### Install Dependencies
Enter into the new directory ("./haximilian-solidity") and run NPM:
> npm install

### Compile and migrate
Building the contracts is as easy as running
> npm run build

Then, all you need to do to migrate the code to the blockchain is to make sure that you have an ethereum node running, pointed to the desired network, and simply run
> npm run migrate

## Run the test server
To test out the functionality of the deployed contracts using the provided web interface, first make sure that you have [MetaMask](https://metamask.io/) installed, and run
> npm run serve

Then, use the newly opened browser window to navigate to "src/index.xhtml" to access the testing pages.
