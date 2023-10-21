// SPDX-License-Identifier: MIT


pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ValidatorContract is Ownable {
    uint256 public validatorStakeAmount = 1 ether; // Set the stake amount here
    uint256 public rewardPerValidation = 1e18; // Set the reward amount here

    struct Validator {
        bool isValidator;
        uint256 stake;
        bool isFrozen;
    }

    ERC20 public token; // The token validators need to stake
    mapping(address => Validator) public validators;

    constructor(address _token) {
        token = ERC20(_token); // Set the token contract
    }

    function becomeValidator() public {
        require(token.balanceOf(msg.sender) >= validatorStakeAmount, "Not enough tokens to stake");
        require(!validators[msg.sender].isValidator, "Already a validator");

        token.transferFrom(msg.sender, address(this), validatorStakeAmount);

        validators[msg.sender] = Validator(true, validatorStakeAmount, false);
    }

    function removeValidator() public {
        require(validators[msg.sender].isValidator, "Not a validator");
        require(!validators[msg.sender].isFrozen, "Stake is frozen");

        token.transfer(msg.sender, validators[msg.sender].stake);

        validators[msg.sender] = Validator(false, 0, false);
    }

    function validateTransaction() public {
        require(validators[msg.sender].isValidator, "Not a validator");
        require(!validators[msg.sender].isFrozen, "Stake is frozen");

        token.transfer(msg.sender, rewardPerValidation);
    }

    function freezeValidatorStake(address _validator) public onlyOwner {
        require(validators[_validator].isValidator, "Not a validator");

        validators[_validator].isFrozen = true;
    }

    function slashValidatorStake(address _validator) public onlyOwner {
        require(validators[_validator].isValidator, "Not a validator");

        validators[_validator] = Validator(false, 0, false);
    }

    function isValidator(address _validator) public view returns(bool) {
        return validators[_validator].isValidator;
    }
}
