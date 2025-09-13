// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title MizuhikiVerifiedGate
 * @notice Inherit this to require callers hold at least one Mizuhiki Verified SBT
 * @custom:security-contact developers@japansmartchain.com
 */
abstract contract MizuhikiVerifiedCheck {
    error NotVerified(address account, string message);

    IERC721 public immutable MIZUHIKI_VERIFIED_CONTRACT;

    constructor(address _verifier) {
        MIZUHIKI_VERIFIED_CONTRACT = IERC721(_verifier);
    }

    modifier onlyVerified(address account) {
        if (MIZUHIKI_VERIFIED_CONTRACT.balanceOf(account) == 0) {
            revert NotVerified(
                account,
                "Receiver Address does not hold Mizuhiki Verified SBT"
            );
        }
        if (MIZUHIKI_VERIFIED_CONTRACT.balanceOf(msg.sender) == 0) {
            revert NotVerified(
                msg.sender,
                "Sender does not hold Mizuhiki Verified SBT"
            );
        }
        _;
    }
}
