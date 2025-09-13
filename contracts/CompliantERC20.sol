// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Compliant (verification-gated) ERC20 token
/// @notice ERC20 whose minting is access-managed and whose transfers are restricted to verified addresses.
/// @dev
/// Features:
/// - AccessManaged: authority controls functions with the restricted modifier (e.g. mint)
/// - MizuhikiVerifiedCheck: enforces recipient (and implicitly msg.sender) verification via onlyVerified
/// - Transfer hook override (_update) ensures compliance at transfer / mint / burn time
contract CompliantERC20 is ERC20 {
    /// @notice Deploy ERC20 token.
    /// @param _name ERC20 name.
    /// @param _symbol ERC20 symbol.
    /// @param initialSupply The initial supply to mint to the deployer
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 initialSupply
    )
        ERC20(_name, _symbol)
    {
        // Mint the initial supply to the deployer
        if (initialSupply > 0) {
            _mint(msg.sender, initialSupply);
        }
    }

}