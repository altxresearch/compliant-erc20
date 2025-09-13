// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {AccessManaged} from "@openzeppelin/contracts/access/manager/AccessManaged.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {MizuhikiVerifiedCheck} from "./MizuhikiVerified.sol";

/// @title Compliant (verification-gated) ERC20 token
/// @notice ERC20 whose minting is access-managed and whose transfers are restricted to verified addresses.
/// @dev
/// Features:
/// - AccessManaged: authority controls functions with the restricted modifier (e.g. mint)
/// - MizuhikiVerifiedCheck: enforces recipient (and implicitly msg.sender) verification via onlyVerified
/// - Transfer hook override (_update) ensures compliance at transfer / mint / burn time
contract CompliantERC20 is ERC20, AccessManaged, MizuhikiVerifiedCheck {
    /// @notice Deploy the compliant token.
    /// @param initialAuthority The AccessManager authority address controlling restricted functions.
    /// @param verifier The address of the Mizuhiki verification contract.
    /// @param _name ERC20 name.
    /// @param _symbol ERC20 symbol.
    /// @param initialSupply The initial supply to mint to the deployer
    constructor(
        address initialAuthority,
        address verifier,
        string memory _name,
        string memory _symbol,
        uint256 initialSupply
    )
        ERC20(_name, _symbol)
        AccessManaged(initialAuthority)
        MizuhikiVerifiedCheck(verifier)
    {
        // Mint the initial supply to the deployer
        if (initialSupply > 0) {
            _mint(msg.sender, initialSupply);
        }
    }

    /// @notice Mint new tokens to a verified address.
    /// @dev Restricted by AccessManaged (caller must have permission). Verification of `to`
    /// is enforced indirectly by _update (onlyVerified) when _mint triggers the transfer hook.
    /// @param to Recipient address (must be verified).
    /// @param amount Amount of tokens to mint (in smallest units).
    function mint(address to, uint256 amount) public restricted {
        _mint(to, amount);
    }

    /// @inheritdoc ERC20
    /// @dev Adds onlyVerified(to) to restrict transfers / mints / burns to verified addresses.
    /// - For mint: from == address(0)
    /// - For burn: to == address(0)
    /// Reverts if `to` (and internally msg.sender per modifier logic) is not verified.
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20) onlyVerified(to) {
        super._update(from, to, value);
    }
}