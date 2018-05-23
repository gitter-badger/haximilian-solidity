# State
Provides solutions for managing state-based contracts.

## Contracts

 - [**LinearStateMachine**](#linearstatemachine): a basis for contracts which follow a roughly linear life-cycle.

### LinearStateMachine
The LinearStateMachine contract provided a structure for creating contracts which move through a number of sequential stages throughout their lifetimes. One example of such a contract might be a contract representing a financial transaction. Such a contract would first go through a deposit stage, where both parties would make their deposits to the transaction. Then, it would enter a confitmation stage, after one party suggested that they complete the trade, and then, after the second party also confirmed, it would enter a withdrawal stage, during which both parties would be allowed to withdraw their earnings from the transaction. It would not make sense for the contract to skip from deposit to withdrawal, nor would it make sense to allow the contract to return to the confirmation stage from the withdrawal stage. As such, this contract's state would be considered strictly linear. LinearStateMachine is a little more flexible, in that contracts can occasionally be allowed to revert to a previous stage if such behavior is specified, but otherwise, it follows this model.

#### Instantiation
Once your contract has been declared to inherit from LinearStateMachine, you will be free to use a number of provided modifiers in order to regulate the functionality of your contract. The state of the contract is stored as a `uint`, starting with a value of '0', and increasing by 1 every time the contract enters a new stage.
<br/>
You can use the `beforeState(uint state)`, `atState(uint state)`, and `afterState(uint state)` modifiers to restrict certain functions such that they can only be called at certain stages. For example:

```solidity
function foo() public atState(3) { ... }
```

could only be called in the 4th stage of the contract (starting from stage 0). Meanwhile,

```solidity
function foo() afterState(4) beforeState(7) { ... }
```

can only be called between stages 4 & 7.
<br/>
In terms of actually progressing from state to state, LinearStateMachine offers the `progressState` modifier to sequentially increment the state value uppon error-free completion of a method. It also provides `toState(uint state)` which allows the state to jump abruptly to the given state after error-free completion of the method. This is useful for situations where the strictly linear progression is not ideal.

#### Events
The LinearStateMachine contract emits just one kind of event:
 - `StateChange(uint state)`: Emitted after the state of the contract has been changed. `state` is the new state of the contract.

----
*Copyright &copy; 2018 Haximilian*
