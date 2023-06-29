//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

import "./ERC721Full/ERC721.sol";
import "./ERC721Full/Strings.sol";

contract BikeTwins is ERC721{
    using Strings for uint256;

    address public owner;
    string private baseTokenURI;

    mapping (uint256 => uint256) private mileages;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    constructor (string memory name, string memory symbol, string memory baseTokenURI_) ERC721(name, symbol) {
        owner = msg.sender;
        baseTokenURI = baseTokenURI_;
    }

    function safeMint(address to, uint256 tokenId) onlyOwner external{
        _safeMint(to, tokenId, "");
    }


    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return string(abi.encodePacked(baseURI, "/", tokenId.toString(), ".json"));
    }

    function mileageOf(uint256 tokenId) public view returns (uint256) {
        _requireMinted(tokenId);
        return mileages[tokenId];
    }

    function increaseMileage(uint256 tokenId, uint256 amount) public onlyOwner {
        _requireMinted(tokenId);
        mileages[tokenId] += amount;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }
}