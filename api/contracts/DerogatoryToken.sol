// contracts/KredToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DerogatoryToken is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor()  ERC721("DerogatoryToken", "BAD") {

    }


   function mint(address recipient,uint256 _invoiceId) public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);

        return newItemId;
    }

  function burn(uint256 _invoiceId) public
        returns (uint256)
    {

        _burn(_invoiceId);

        return _invoiceId;
    }

}