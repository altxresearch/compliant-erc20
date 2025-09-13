// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.30;

import {AccessManager} from "@openzeppelin/contracts/access/manager/AccessManager.sol";

/**
 * @title AccessManager
 * @notice Simple wrapper around OpenZeppelin's AccessManager
 * @dev This contract extends OpenZeppelin's AccessManager without modifications
 *      The AccessManager provides role-based access control for the entire system
 */
contract ERC20AccessManager is AccessManager {
    /**
     * @notice Constructor that initializes the AccessManager with an initial admin
     * @param initialAdmin The address that will be granted the initial admin role
     */
    constructor(address initialAdmin) AccessManager(initialAdmin) {
        // The parent constructor handles all initialization
    }
}
