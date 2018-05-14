# Management
Provides a set of solutions for managing deployed contracts.

## Contracts

 - [**Killable**](#killable): a basis for contracts which are terminable by their owner.

### Killable
The Killable contact provides its children the ability to be destroyed by their owners (can be any individual, contract, or DAO) once they have served their purpose. This is especially useful in upgradeable libraries and contracts, where the central control unit can deprovision the contracts once they have been replaced, thus freeing up space on the blockchain and making a little money back, to help cover the cost of the new deployment.

#### Instantiation
Using the Killable contract in your own code is extremely simple. Once the Killable contract has been imported and used as the hierarchical parent of the child contract, just extend the child contract's constructor as follows:
```solidity
constructor() public Killable() { ... }
```
This setup will set the owner of the contract to the address which created it. Upon destruction of the contact, the owner will also receive all of the contract's funds. If this is not the desired behavior, IE if the funds should be forwarded to a different inheritor address, the following setup can be used instead:
```solidity
constructor(address _inheritor) public Killable(_inheritor) { ... }
```
Please be aware that the owner will still be able to change the inheritor address later on if they so desire by calling the `changeInheritor` contract method.

#### Events
The Killable contract emits 2 kinds of events:
 - `Destroyed`: Emitted after the contract has been directed by its owner to run `selfdestruct`
 - `InheritorChanged(address inheritor)`: Emitted after the owner has specified a new address to inherit the contract's funds upon destruction

----
*Copyright &copy; 2018 Haximilian*
